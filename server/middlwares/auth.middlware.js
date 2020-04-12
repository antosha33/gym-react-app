const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {

 try {
    const token = req.headers.authorization.split(' ')[1];

    const userId = jwt.verify(token, config.get('jwtSecret')).userId;

    if(userId){
      req.userId = userId;
      next();
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wrong');
  }
}

module.exports.auth = auth;
