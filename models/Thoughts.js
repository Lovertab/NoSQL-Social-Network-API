const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

// Schema to create a course model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method
      // moment js
      get: function (date) {
        return new Date(date).toLocaleDateString()
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Thoughts = model('thought', thoughtsSchema);

module.exports = Thoughts;
