const { Router } = require('express');
const { User } = require('./models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const auth = Router();

auth.post('/register',
  check('login').isLength({ min: 6 }),
  check('passowrd').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors) {
        return res.status(400).json({ errors: errors.array(), message: 'Неверные данные при регистрации' });
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

      newUser.save();

      res.status(201).json({message: 'Пользователь зарегестрирован'});

    } catch (e) {
      console.log(e);
      return res.status(500).json('something went wrong');
    }

  })


auth.post('/login',
  async (req, res) => {

  })

module.exports = auth;