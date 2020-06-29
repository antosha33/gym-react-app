const { Router } = require('express');
const { Workout } = require('./models/Workout');
const { auth } = require('../middlwares/auth.middlware');
const { check, validationResult } = require('express-validator');

const workout = Router();

workout.post('/create', auth,

check('exercises.*.approachQuantity').isLength({ min: 1 }),
check('exercises.*.repetitionsNumber').isLength({ min: 1 }),
check('exercises.*.weight').isLength({ min: 1 }),
async(req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные при создании тренировки' });
    }

    const newWorkout = new Workout({
      ...req.body
    })
    await newWorkout.save();

    console.log(req.body);
    res.status(201).json({message: 'Новая тренировка создана'});

  } catch (error) {
    
  }
})

 module.exports = workout;

