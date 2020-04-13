const { Router } = require('express');
const Complex = require('./models/Complex');
const Exercise = require('./models/Exercise');
const { auth } = require('../middlwares/auth.middlware');

const complexes = Router();

complexes.post('/complex/create', auth, async (req, res) => {
  try {
    const { exercise, name, level } = req.body;

    const complex = await Complex.findOne({ name })

    if (complex) {
      return res.status(400).json({ message: 'Комплекс с таким именем уже существует' });
    }

    const newComplex = new Complex({
      name,
      level,
      exercises: exercise,
      owner: req.userId
    });

    await newComplex.save();

    return res.status(200).json({message:'Комплекс успешно добавлен'})

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

module.exports = complexes;