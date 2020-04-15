const {Schema, model} = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  expired: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  votes: {
    type: Number,
    default: 0
  },
  abstained: {
    type: Number,
    default: 0
  },
  answers: [
    {
      answer: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        default: 0
      }
    }
  ],
  public: {
    type: Boolean,
    default: false
  }
});

module.exports = model('Vote', schema);