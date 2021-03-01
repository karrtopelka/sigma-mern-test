const { Schema, model } = require('mongoose');

const Passport = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passportNumber: { type: String, required: true },
});

module.exports = model('Passport', Passport);
