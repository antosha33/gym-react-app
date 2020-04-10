const { Schema, model, Types } = require('mongoose');


const partsScheme = new Schema({
  name: { type: Types.ObjectId, ref: 'Exrecise', required: true },
  approachCuantity: Number,
  repetitionsNumber: Number,
})

const complexScheme = new Schema({
  name: { type: String, required: true, unique: true },
  parts: [partsScheme],
  owner: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports.Complex = model('Complex', complexScheme);