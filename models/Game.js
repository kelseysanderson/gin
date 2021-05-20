const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// room
var GameSchema = new Schema({
    playerOne: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User'
    },
    playerOneName: {
        type: String,
        default: null,
        ref: 'User'
    },
    playerTwo: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User'
    },
    playerTwoName: {
        type: String,
        default: null,
        ref: 'User'
    },
    score: {
        type: String,
        required: false,
        default: 0
    },
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
