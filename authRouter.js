const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'username cannot be empty').notEmpty(),
    check('password', 'password need to be more then 8 symbols').isLength({
      min: 8,
    }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.post(
  '/passport',
  [
    check('firstName', 'username cannot be empty').notEmpty(),
    check('lastName', 'username cannot be empty').notEmpty(),
    check('passportNumber', 'username cannot be empty').notEmpty(),
  ],
  controller.setPassport,
);
router.post('/favcolor', controller.setFavColor);

module.exports = router;
