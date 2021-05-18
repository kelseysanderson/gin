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
        default: null,
        ref: 'User'
    },
    playerOneScore: {
        type: Number,
        required: false,
        default: 0
    },
    playerTwoScore: {
        type: Number,
        required: false,
        default: 0
    },
    // socketId: {
    //     type: Number,
    // },
    isActiveGame: {
        type: Boolean,
        default: false,
    },
    needPlayerTwo: {
        type: Boolean,
        default: false,
    }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
