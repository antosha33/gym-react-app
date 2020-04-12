const { Router } = require('express');
const Complex = require('./models/Complex');
const Exercise = require('./models/Exercise');
const { auth } = require('../middlwares/auth.middlware');

const exercises = Router();

exercises.post('/exercise/create', auth, async (req, res) => {
  try {
    const { name, bodyPart } = req.body;
    let dataToStore;
    if (name && bodyPart) {
      dataToStore = { name, bodyPart }
    } else {
      dataToStore = { name }
    }
    if (name) {
      const newExercise = new Exercise(dataToStore)
      await newExercise.save();

      return res.status(201).json({ message: 'Упражнение добалено' });
    } else {
      return res.status(400).json({ message: 'Неверно указаны данные' });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})


exercises.post('/exercise/delete', auth, async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      await Exercise.findByIdAndDelete(id)
      return res.status(200).json({ message: 'Упражнение удалено' })
    } else {
      return res.status(400).json({ message: 'Неверно указаны данные' });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

exercises.get('/exercise', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({}).sort('name');
    return res.status(200).json(exercises);

  } catch (error) {
    return res.status(500).json('something went wrong');
  }

})


module.exports = exercises;