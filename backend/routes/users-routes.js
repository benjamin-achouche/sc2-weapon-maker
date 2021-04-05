const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const validators = {
  signup: [
    check('name').trim().notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').trim().isLength({ min: 6 }),
  ],
};

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  validators.signup,
  usersControllers.signup
);

router.post('/login', usersControllers.login);

router.use(checkAuth);

router.delete('/:uid', usersControllers.deleteUser);

module.exports = router;
