const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema
  .virtual("reactionCount")
  .get(function () {
    return this.reaction.length;
  });
// formats date function
thoughtSchema.virtual("dateCreated").get(function () {
  return this.createdAt.toString()
});
const Thought = model("thought", thoughtSchema);

module.exports = Thought;