const { Router } = require('express');
const Complex = require('./models/Complex');
const Exercise = require('./models/Exercise');
const {auth} = require('../middlwares/auth.middlware');

const programs = Router();

programs.post('/create',auth, async (req, res) => {
  try {
    

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

programs.get('/', auth, async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).json('something went wrong');
  }

})


module.exports = programs;