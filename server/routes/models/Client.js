const { Schema, model, Types } = require('mongoose');

const clientScheme = new Schema({
  name: { type: String, required: true },
  surname: { type: String },
  age: { type: Number },
  weight: { type: Number },
  dateOfStart: { type: Date, default: Date.now, required: true },
  aim: { type: String },
  description: { type: String },
  workout: { type: Types.ObjectId, ref: 'Workout' },
  owner: {type: Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Client', clientScheme);