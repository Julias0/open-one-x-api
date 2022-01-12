const mongoose = require('mongoose')

const nextItemSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  meeting: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meeting',
    required: true
  },
  status: String
}, {
  timestamps: true
});



module.exports = mongoose.model('NextItem', nextItemSchema);