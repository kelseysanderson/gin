const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  // this could be used to show user history ()
  history: {
    type: [Schema.Types.ObjectId],
    ref: 'Game',
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
