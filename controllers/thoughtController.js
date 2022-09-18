const { Thought, User } = require("../models");
// get thoughts
module.exports = { // exports below functions so they are available to use in other scripts
  getThought(req, res) { // this function is called from thoughtRoutes.js
    Thought.find() // looks in the thoughts collection and find the records
      .then((thoughts) => res.json(thoughts)) // respond with all thought documents matching the .find above 
      .catch((err) => { // this catches any errors 
        return res.status(500).json(err); // returns error message/status
      });
  },
  // get single thought
  getSingleThought(req, res) { // exports below functions so they are available to use in other scripts
    Thought.findOne({ _id: req.params.thoughtId }) // this method is called from the thoughtRought 
      .then((thought) => // this passes the result of the above method as an object called thought
        !thought // checks if a thought was returned
          ? res.status(404).json({ message: "No thought with that ID" }) // if thought is false (no thought ID found)
          : res.json(thought) // or else if thought is true (finds thought with ID) returns the thought as a JSON object
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText }, { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create thought
  createThought(req, res) { // exports the below function to be called from other files
    Thought.create(req.body) // this uses the req.body to create a new thought
      .then((thought) => { // then runs a true or false followed by a else
        !thought
          ? res.status(404).json({ message: "No thought has been created" }) : "";
        User.findOneAndUpdate( // find user to update 
          { username: req.body.username }, // sets the user name in accordence to the contents in req.body.username
          { $addToSet: { thoughts: thought._id } }, // this adds the ID of the thought we just created to the thoughts array in the use record 
          { new: true }
        )
          .then(() => {
            res.status(200).json({ status: "success", data: thought }) // this returns the response of the thought object if the thought is created
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err); // catches the error for thought.create
      })
  },
};
