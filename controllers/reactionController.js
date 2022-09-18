const { Reaction, Thought } = require('../models');
const { ObjectId } = require("mongodb");
// Add Reactions
module.exports = {
    createReaction(req, res) {
        console.log(req.params.thoughtId);
        console.log(req.body)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { new: true, runValidators: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "Reaction created but not added to Thought." })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })

    },
    // delete Reactions
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { _id: ObjectId(req.params.reactionId) } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No thought with that id." })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            });
    },
}