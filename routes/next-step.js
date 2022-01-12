const router = require('express').Router();
const { checkAndDecodeToken } = require('../services/auth');
const NextItem = require('../models/next-item.model');

router
  .get('/', checkAndDecodeToken, async (req, res) => {
    const currentUser = res.locals.user;

    const nextItems = await NextItem.find({ owner: currentUser._id }).populate('meeting').lean();

    res.json(nextItems);
  })
  .post('/:id/complete', checkAndDecodeToken, async (req, res) => {
    const currentUser = res.locals.user;
    const nextStepId = req.params.id;

    const nextItem = await NextItem.findOne({ _id: nextStepId, owner: currentUser._id });

    if (!nextItem) {
      res.status(400).json({
        message: 'Next step not found'
      });
    } else {
      nextItem.status = 'COMPLETE'
    }

    await nextItem.save();

    res.json({
      status: 'success',
      nextItem
    })
  });

module.exports = router;