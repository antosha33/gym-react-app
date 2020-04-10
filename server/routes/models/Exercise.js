const { Schema, model} = require('mongoose');

const exerciseScheme = new Schema({
  name: { type: String, required: true, unique: true },
})



module.exports.Exercise = model('Exercise', exerciseScheme);