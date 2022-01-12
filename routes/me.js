const router = require('express').Router();
const { checkAndDecodeToken } = require('../services/auth');

router.get('/', checkAndDecodeToken, (req, res) => {
  res.json(res.locals.user);
});

module.exports = router;