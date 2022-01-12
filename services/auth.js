const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const secretKey = process.env.SECRET_KEY;;

module.exports = {
  prepareAccessToken: async function (userId) {
    const user = await User.findOne({ _id: userId }).lean();
    user.password = '';
    const accessToken = jwt.sign(user, secretKey, {
      expiresIn: '30d'
    });
    return accessToken;
  },
  checkAndDecodeToken: async function (req, res, next) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).json({
        message: 'Unauthenticated'
      });
    } else {
      try {
        const decodedUser = jwt.verify(accessToken, secretKey);
        const user = await User.findOne({ _id: decodedUser._id });
        user.password = '';
        res.locals.user = user;
        next();
      } catch (error) {
        res.status(401).json({
          message: 'Unauthenticated'
        });
      }
    }
  }
}