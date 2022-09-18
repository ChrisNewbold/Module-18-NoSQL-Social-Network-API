const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/reactions', reactionRoutes);
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
