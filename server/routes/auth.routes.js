const { Router } = require('express');
const { User } = require('./models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const auth = Router();

auth.post('/register',
  check('login').isLength({ min: 6 }),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные при регистрации' });
      }

      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        login: login,
        password: hashPassword
      });

     await newUser.save();

      res.status(201).json({message: 'Пользователь зарегестрирован! Можете войти'});

    } catch (e) {
      console.log(e);
      return res.status(500).json('something went wrong');
    }

  })


auth.post('/login',
  check('login').isLength({ min: 6 }),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    try{ 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error: errors.array(), message: 'Некорректные данные при входе'});
    }

    const {login, password} = req.body;

    const user = await User.findOne({login})

    if(!user){
      return res.status(400).json({message: 'Пользователь не найден'});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json('something went wrong');
  }

  })

module.exports = auth;