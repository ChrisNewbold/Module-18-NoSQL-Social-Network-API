const { Schema, model } = require('mongoose');
// formats date function
const formatDate = (createdAt) => {
    return createdAt.toLocaleDateString();
};

// reactions schema fields
const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);
reactionSchema.virtual("dateCreated").get(function () {
    return this.createdAt.toString()
});
module.exports = reactionSchema;