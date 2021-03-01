const { Schema, model } = require('mongoose');

const FavouriteColor = new Schema({
  userId: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = model('FavouriteColor', FavouriteColor);
