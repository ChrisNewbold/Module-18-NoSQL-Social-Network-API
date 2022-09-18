const router = require('express').Router();

const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route("/:thoughtId/:reactionId")
    .delete(deleteReaction);

router.route("/:thoughtId")
    .post(createReaction);

module.exports = router;