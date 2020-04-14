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

    return res.status(200).json({ message: 'Комплекс успешно добавлен' })

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

complexes.get('/complexes/', auth, async (req, res) => {
  try {

    let complexes = await Complex.find({ owner: req.userId }).sort('-_id');

    complexes = complexes.map((it) => (
      {
        id: it._id,
        name: it.name,
        level: it.level
      }
    )
    );

    return res.status(200).json( complexes );
  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})


complexes.get('/complexes/:id', auth, async (req, res) => {
  try {

    const {id} = req.params;

    let complexe = await Complex.findOne({ _id: id }).populate('exercises.name');
 
    return res.status(200).json( complexe );
  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

module.exports = complexes;