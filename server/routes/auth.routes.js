const { Router } = require('express');
const { User } = require('./models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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

      res.status(201).json({ message: 'Пользователь зарегестрирован! Можете войти' });
      
    } catch (e) {
      console.log(e);
      return res.status(500).json('something went wrong');
    }

  })


auth.post('/login',
  check('login').isLength({ min: 6 }),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), message: 'Некорректные данные при входе' });
      }

      const { login, password } = req.body;

      const user = await User.findOne({ login })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const unhashPass = await bcrypt.compare(password, user.password);

      if (!unhashPass) {
        return res.status(404).json({ message: 'Неверные данные при входе' })
      }

      const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });

      return res.status(200).json({ token, userId: user._id });

    } catch (e) {
      console.log(e);
      return res.status(500).json('something went wrong');
    }
  })

module.exports = auth;