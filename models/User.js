const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({   
  email: {type: String, required:true, unique:true},
  username : {type: String, unique: true, required:true},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
