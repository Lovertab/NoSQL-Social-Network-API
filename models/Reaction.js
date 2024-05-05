const { Schema, Types, model } = require('mongoose');

// Schema to create a course model
const reactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default:() => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length:280,
      
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (date) {
        return new Date(date).toLocaleDateString()
      }
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// const Reactions = model('reactions', reactionsSchema);

module.exports = reactionsSchema;
