const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Invalid inputs passed, please check your data.',
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUserName;
  let existingEmail;
  try {
    existingUserName = await User.findOne({ name: name });
    existingEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  if (existingUserName) {
    const error = new HttpError(
      'This username is already taken, please choose a different one.',
      422
    );
    return next(error);
  } else if (existingEmail) {
    const error = new HttpError(
      'This email exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    weapons: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  const dir = `./uploads/users-code/${createdUser.id}`;

  fs.mkdir(dir, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile(
    `./uploads/users-code/${createdUser.id}/GRSPAF.ini`,
    `[ActionReplay]\r\n[ActionReplay_Enabled]`,
    function (err) {
      if (err) throw err;
    }
  );

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!identifiedUser) {
    const error = new HttpError(
      'Could not find a user with that email address.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid password.', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again.', 500);
    return next(error);
  }

  res.json({
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
  });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let deletedUser;
  try {
    deletedUser = await User.findById(userId);
    if (!deletedUser) {
      const error = new HttpError('Could not find a user for this id.', 404);
      return next(error);
    }
    if (deletedUser.id.toString() !== req.userData.userId) {
      const error = new HttpError(
        'You are not allowed to delete this account.',
        401
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete account.',
      500
    );
    return next(error);
  }

  const avatarImagePath = deletedUser.image;

  try {
    await deletedUser.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete account.',
      500
    );
    return next(error);
  }

  fs.unlink(avatarImagePath, (err) => {
    console.log(err);
  });

  const removeDir = (path) => {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);

      if (files.length > 0) {
        files.forEach(function (filename) {
          if (fs.statSync(path + '/' + filename).isDirectory()) {
            removeDir(path + '/' + filename);
          } else {
            fs.unlinkSync(path + '/' + filename);
          }
        });
        fs.rmdirSync(path);
      } else {
        fs.rmdirSync(path);
      }
    } else {
      console.log('Directory path not found.');
    }
  };

  const pathToDir = path.join(
    __dirname,
    `../uploads/users-code/${deletedUser.id}`
  );

  removeDir(pathToDir);

  res.status(200).json({ message: 'Deleted account.' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
