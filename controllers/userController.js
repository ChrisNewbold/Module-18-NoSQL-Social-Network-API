const { User, Thought } = require("../models");

module.exports = {
  getUser(req, res) {
    User
      .find() // returns all users
      .populate('thoughts') // adds friend by populating via user ID
      .populate('friends') // adds friend by populating via user ID
      .select('-__v') // excludes -__v to tidy up the return body
      .then((user) => res.json(user)) // returns user list
      .catch((err) => { // this catches any errors 
        console.log(err)
        res.status(500).json(err);
      });
  },
  // finds the user based on key identifier being the userID using req.params
  getSingleUser(req, res) {
    console.log(req.params.userId)
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deleting a user using req.params utilising the userID as its key identifier
  deleteUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          console.log(user);
          Thought.deleteMany({ username: user.username })
            .then(
              User.findOneAndDelete({ _id: req.params.userId })
                .then(
                  res.json(user)
                )
            )
        }

      }

      )
      .catch((err) => res.status(500).json(err));
  },
  // Creating a user using the req.body
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updateing the user info based on identifier of userID
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // finds a user via an userID then adds to its friend from req.body.friendID
  addFriend(req, res) {
    console.log(req.params, req.body)
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
  removeFriend(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
};
