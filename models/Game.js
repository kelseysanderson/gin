const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// room
var GameSchema = new Schema({
    // menu, reference to users, don't start until both users are not null
    playerOne: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User'
    },
    playerTwo: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User'
    },
    playerOneScore: {
        type: Number,
        required: true,
        default: false
    },
    playerTwoScore: {
        type: Number,
        required: true,
        default: false
    },
    displayActiveGames: {
        type: Boolean,
        default: false
    },
    canBeJoined: {
        type: Boolean,
        default: false
    },
    socketId: {
        type: Number,
    },
    currentState: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'Game-State'
    },
  
    // boolean to determine whether to display active
    // booolean for open to play/can be joined.
    // display everything that is active, only render button if they are able to join
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
