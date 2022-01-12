const mongoose = require('mongoose');
const nextItem = require('./next-item.model');

const meetingItemSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  nextSteps: [String]
});

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const meetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  withWhom: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  meetingItems: {
    type: [meetingItemSchema],
    default: []
  },
  notes: {
    type: String,
  },
  comments: {
    type: [commentSchema],
    default: []
  }
}, {
  timestamps: true
});

meetingSchema.methods.setNextItems = async function () {
  const allNextSteps = this.meetingItems
    .map(meetingItem => meetingItem.nextSteps)
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter(nextStep => !!nextStep)
    .map(nextStep => new nextItem({
      content: nextStep,
      owner: this.owner,
      meeting: this._id,
      status: 'PENDING'
    }))
    .map(nextItemModel => nextItemModel.save());

  await Promise.all(allNextSteps)
};

meetingSchema.post('save', function () {
  console.log('post save triggered')
  this.setNextItems();
})

module.exports = mongoose.model('Meeting', meetingSchema);
