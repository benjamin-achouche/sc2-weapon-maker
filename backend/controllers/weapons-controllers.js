const path = require('path');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Weapon = require('../models/weapon');
const User = require('../models/user');
const {
  writeARCodeCreate,
  writeARCodeUpdate,
  writeARCodeDelete,
} = require('../ar-code/writeCodeToFile');
const { makeARCode } = require('../ar-code/makeARCode');

const getWeaponById = async (req, res, next) => {
  const weaponId = req.params.wid;

  let weapon;
  try {
    weapon = await Weapon.findById(weaponId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a weapon.',
      500
    );
    return next(error);
  }

  if (!weapon) {
    const error = new HttpError(
      'Could not find a weapon for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ weapon: weapon.toObject({ getters: true }) });
};

const downloadCodeFile = async (req, res, next) => {
  const userId = req.params.uid;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Download failed, please try again.', 500);
    return next(error);
  }

  const pathToFile = path.join(
    __dirname,
    `../uploads/users-code/${user.id}/GRSPAF.ini`
  );

  res.download(pathToFile);
};

const getWeaponsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWeapons;

  try {
    userWeapons = await User.findById(userId).populate('weapons');
  } catch (err) {
    const error = new HttpError(
      'Fetching weapons failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWeapons) {
    const error = new HttpError(
      'Could not find weapons for the provided user id.',
      404
    );
    return next(error);
  }

  res.json({
    userWeapons: userWeapons.weapons.map((weapon) =>
      weapon.toObject({ getters: true })
    ),
  });
};

const createWeapon = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {
    character,
    name,
    description,
    imageUrl,
    attributes,
    points,
  } = req.body;

  const createdWeapon = new Weapon({
    character,
    name,
    description,
    imageUrl,
    attributes,
    points,
    creator: req.userData.userId,
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating weapon failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdWeapon.save({ session: sess });
    user.weapons.push(createdWeapon);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating weapon failed, please try again.',
      500
    );
    return next(error);
  }

  const code = makeARCode(
    { ...createdWeapon.attributes },
    `${createdWeapon.name.toLowerCase()} ${createdWeapon.character}`,
    createdWeapon
  );
  const createdCode = `$${createdWeapon.name.toUpperCase()}\r\n${code}`;

  writeARCodeCreate(`./uploads/users-code/${user.id}/GRSPAF.ini`, createdCode);

  res.status(201).json({ weapon: createdWeapon });
};

const updateWeapon = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const weaponId = req.params.wid;

  const { name, description, attributes, points } = req.body;

  let weaponToUpdate;
  let updatedWeapon;
  let user;

  try {
    weaponToUpdate = await Weapon.findById(weaponId);
    updatedWeapon = await Weapon.findById(weaponId);
    user = await User.findById(req.userData.userId);
    if (!updatedWeapon) {
      const error = new HttpError('Could not find a weapon for this id.', 404);
      return next(error);
    }
    if (updatedWeapon.creator.toString() !== req.userData.userId) {
      const error = new HttpError(
        'You are not allowed to edit this weapon.',
        401
      );
      return next(error);
    }
    updatedWeapon.name = name;
    updatedWeapon.description = description;
    updatedWeapon.attributes = attributes;
    updatedWeapon.points = points;
    await updatedWeapon.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update weapon.',
      500
    );
    return next(error);
  }

  const oldCode = makeARCode(
    { ...weaponToUpdate.attributes },
    `${weaponToUpdate.name.toLowerCase()} ${weaponToUpdate.character}`,
    weaponToUpdate
  );

  const newCode = makeARCode(
    { ...updatedWeapon.attributes },
    `${updatedWeapon.name.toLowerCase()} ${updatedWeapon.character}`,
    updatedWeapon
  );

  const codeToUpdate = `$${weaponToUpdate.name.toUpperCase()}\r\n${oldCode}`;

  const updatedCode = `$${updatedWeapon.name.toUpperCase()}\r\n${newCode}`;

  writeARCodeUpdate(
    `./uploads/users-code/${user.id}/GRSPAF.ini`,
    codeToUpdate,
    updatedCode
  );

  res.status(200).json({ weapon: updatedWeapon.toObject({ getters: true }) });
};

const deleteWeapon = async (req, res, next) => {
  const weaponId = req.params.wid;

  let deletedWeapon;
  let user;

  try {
    deletedWeapon = await Weapon.findById(weaponId).populate('creator');
    user = await User.findById(req.userData.userId);
    if (!deletedWeapon) {
      const error = new HttpError('Could not find a weapon for this id.', 404);
      return next(error);
    }
    if (deletedWeapon.creator.id !== req.userData.userId) {
      const error = new HttpError(
        'You are not allowed to delete this weapon.',
        401
      );
      return next(error);
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await deletedWeapon.remove({ session: sess });
    deletedWeapon.creator.weapons.pull(deletedWeapon);
    await deletedWeapon.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete weapon.',
      500
    );
    return next(error);
  }

  const deleteCode = makeARCode(
    { ...deletedWeapon.attributes },
    `${deletedWeapon.name.toLowerCase()} ${deletedWeapon.character}`,
    deletedWeapon
  );

  const codeToDelete = `$${deletedWeapon.name.toUpperCase()}\r\n${deleteCode}`;

  writeARCodeDelete(`./uploads/users-code/${user.id}/GRSPAF.ini`, codeToDelete);

  res.status(200).json({ message: 'Deleted weapon.' });
};

exports.getWeaponById = getWeaponById;
exports.downloadCodeFile = downloadCodeFile;
exports.getWeaponsByUserId = getWeaponsByUserId;
exports.createWeapon = createWeapon;
exports.updateWeapon = updateWeapon;
exports.deleteWeapon = deleteWeapon;
