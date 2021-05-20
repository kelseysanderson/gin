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
  },
  numberOfWins: {
    type: Number,
    required:true,
    default: 0
  },
  numberOfLosses: {
    type: Number,
    required: true,
    default: 0
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
