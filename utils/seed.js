const { Thought, User } = require('../models');
const db = require('../config/connection');
db.once('open', async () => { 
  await Thought.deleteMany({});
  await User.deleteMany({});
  console.log("delete");
  process.exit(0);
});