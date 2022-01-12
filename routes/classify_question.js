const router = require('express').Router()
const { checkAndDecodeToken } = require('../services/auth');
const classifierService = require('../services/classifier')

router.post('/', checkAndDecodeToken, async (req, res) => {
  const currentUser = res.locals.user;
  const {
    question
  } = req.body;

  if (!question) {
    res.status(400).json({ message: 'question is required' });
  } else {
    res.json(classifierService.classify(question));
  }
});

module.exports = router;