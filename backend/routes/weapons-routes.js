const express = require('express');
const { check } = require('express-validator');

const weaponsControllers = require('../controllers/weapons-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const validators = {
  createWeapon: [
    check('name').trim().notEmpty(),
    check('description').trim().isLength({ min: 5 }),
  ],
  updateWeapon: [
    check('name').trim().notEmpty(),
    check('description').trim().isLength({ min: 5 }),
  ],
};

router.get('/:wid', weaponsControllers.getWeaponById);

router.get('/download/:uid', weaponsControllers.downloadCodeFile);

router.get('/user/:uid', weaponsControllers.getWeaponsByUserId);

router.use(checkAuth);

router.post('/', validators.createWeapon, weaponsControllers.createWeapon);

router.patch('/:wid', validators.updateWeapon, weaponsControllers.updateWeapon);

router.delete('/:wid', weaponsControllers.deleteWeapon);

module.exports = router;
