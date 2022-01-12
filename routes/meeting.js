const router = require('express').Router();
const { checkAndDecodeToken } = require('../services/auth');
const Meeting = require('../models/meeting.model');

router
  .get('/', checkAndDecodeToken, async (req, res) => {
    const {
      withWhom,
    } = req.query;

    const currentUser = res.locals.user;
    let query = { owner: currentUser._id };

    if (withWhom) {
      query = Object.assign({}, query, { withWhom })
    }

    const meetings = await Meeting.find(query).lean();
    res.json(meetings);
  })
  .get('/with_whom', checkAndDecodeToken, async (req, res) => {
    const currentUser = res.locals.user;
    let query = { owner: currentUser._id };

    const meetings = await Meeting.find(query).distinct('withWhom');
    res.json(meetings);
  })
  .post('/', checkAndDecodeToken, async (req, res) => {
    const currentUser = res.locals.user;
    const {
      _id,
      name,
      withWhom,
      meetingItems,
      notes,
      comments
    } = req.body;

    if (!_id) {
      const newMeeting = new Meeting({
        name,
        withWhom,
        owner: currentUser._id,
        meetingItems,
        notes,
        comments
      });

      const savedMeeting = await newMeeting.save();

      res.json(savedMeeting)
    } else {
      const existingMeeting = await Meeting.findOne({ _id });

      if (!existingMeeting) {
        res
          .status(404)
          .json({
            message: 'meeting dosnt exist'
          });
      } else {

        await Meeting.updateOne({ _id: existingMeeting._id }, {
          withWhom,
          notes,
          comments
        });

        const updatedMeeting = await Meeting.findOne({ _id }).lean();

        res.json(updatedMeeting);
      }
    }
  });

module.exports = router;