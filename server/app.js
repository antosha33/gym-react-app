const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));
app.use('/auth', require('./routes/auth.routes'));

mongoose.connect(config.get('mongoUri'),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if(err) console.log(err);
  app.listen(config.get('PORT') || 3000, ()=>console.log('app has been started'));
})