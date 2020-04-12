const { Schema, model, Types } = require('mongoose');


const exersisesScheme = new Schema({
  name: { type: Types.ObjectId, ref: 'Exrecise', required: true },
  approachCoantity: {type:Number, default: 4},
  repetitionsNumber: Number,
  weight: Number,
})

const complexScheme = new Schema({
  name: { type: String, required: true, unique: true },
  exercises: [exersisesScheme],
  owner: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports.Complex = model('Complex', complexScheme);