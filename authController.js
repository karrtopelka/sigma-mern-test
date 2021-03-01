const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');
const Log = require('./models/Log');
const Passport = require('./models/Passport');
const FavouriteColor = require('./models/FavouriteColor');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: `${errors.errors[0].msg}`,
        });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Registration error', err });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Password not match' });
      }
      const token = generateAccessToken(user._id, user.roles);
      const log = new Log({
        userId: user._id,
      });
      await log.save();
      const passport = await Passport.findOne({ userId: user._id });
      const color = await FavouriteColor.findOne({ userId: user._id });

      return res.json({
        token: token,
        userId: user._id,
        firstName: passport && passport.firstName,
        lastName: passport && passport.lastName,
        passportNumber: passport && passport.passportNumber,
        color: color && color.color,
      });
    } catch (err) {
      return res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }

  async setPassport(req, res) {
    try {
      const { userId, firstName, lastName, passportNumber } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Passport data error', errors });
      }
      const user = await Passport.findOne({ userId });
      if (!user) {
        const passport = new Passport({
          userId,
          firstName,
          lastName,
          passportNumber,
        });
        await passport.save();
      } else {
        await user.updateOne({ firstName, lastName, passportNumber });
      }
      return res.json({ message: 'Passport added successfuly' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }

  async setFavColor(req, res) {
    try {
      const { userId, color } = req.body;
      const user = await FavouriteColor.findOne({ userId });
      if (!user) {
        const favColor = new FavouriteColor({
          userId,
          color,
        });
        await favColor.save();
      } else {
        await user.updateOne({ color });
      }
      return res.json({ message: 'Favourite color added successfuly' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new authController();
