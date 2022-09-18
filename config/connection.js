const mongoose = require('mongoose');

// connection
mongoose.connect("mongodb://localhost:27017/test",{
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export file
module.exports = mongoose.connection;
