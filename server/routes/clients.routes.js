const { Router } = require('express');
const Client = require('./models/Client');
const {auth} = require('../middlwares/auth.middlware');

const clients = Router();

clients.post('/create',auth, async (req, res) => {
  try {

    const client = new Client({
      ...req.body,
      owner: req.userId,
    });

    await client.save();
    
    return res.status(201).json({message: 'Новый клиент успешно добавлен'})

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }

})

clients.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({owner: req.userId});
   return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json('something went wrong');
  }

})


module.exports = clients;