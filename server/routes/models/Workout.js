const { Schema, Types, model } = require('mongoose');

const workoutExercises = new Schema({
  exercise: { type: Types.ObjectId, ref: 'Exercise' },
  approachQuantity: Number,
  repetitionsNumber: Number,
  weight: Number,
})


const workoutScheme = new Schema({
  date: { type: Date, default: Date.now, required: true },
  isPaid: Boolean,
  complex: [String],
  exercises: [workoutExercises],
  owner: { type: Types.ObjectId, ref: 'Client' },
});

module.exports.Workout = model('Workout', workoutScheme);