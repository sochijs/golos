const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  votes: [
    {
      voteId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Vote'
      },
      answerId: String,
      abstained: Boolean
    }
  ]
});

module.exports = model('User', schema);