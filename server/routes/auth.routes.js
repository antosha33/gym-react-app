const {Router} = require('express');
const {User} = require('./models/User');
const {check, validationResult } = require('express-validator');

const auth = Router();

auth.post('/register',

async(req, res) => {

})


auth.post('/login', 
async(req, res) => {
  
})

module.exports = auth;