const { Schema, model } = require('mongoose');

const Log = new Schema({
  userId: { type: String, required: true },
  timeEntry: { type: Date, required: true, default: Date.now },
});

module.exports = model('Log', Log);
