const { Schema, model} = require('mongoose');

const exerciseScheme = new Schema({
  name: { type: String, required: true, unique: true },
  bodyPart: {type: String, default: 'ОБЩАЯ'}
})

module.exports = model('Exercise', exerciseScheme);