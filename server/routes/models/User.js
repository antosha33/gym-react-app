const {Schema, model, Types} = require('mongoose');

const userScheme = new Schema({
  name: {type:String, required: true, unique: true},
  password: {type: String, required: true},
  programs: {type: Types.ObjectId, ref: 'Program'}
});

module.exports.User = model('User', userScheme);