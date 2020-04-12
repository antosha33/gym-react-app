const { Router } = require('express');
const Complex = require('./models/Complex');
const Exercise = require('./models/Exercise');
const { auth } = require('../middlwares/auth.middlware');

const complexes = Router();

complexes.post('/complex/create', auth, async (req, res) => {
  console.log(11111);
  try {
    const {exercise, name, level} = req.body;
    console.log(exercise, name, level);
  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

module.exports = complexes;