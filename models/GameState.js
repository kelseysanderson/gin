const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GameStateSchema = new Schema({
    // menu, reference to users, don't start until both users are not null
    // curren player (one or two?)
    currentPlayer: {
        type: Number,
        required: true,
        default: 1
    },
    playerOneHand: {
        type: [Number],
        default: []
    },
    playerTwoHand: {
        type: [Number],
        default: []
    },
    // 1-52 cards
    deck: {
        type: [Number],
        default: []
    },
    discardState: {
        type: [Number],
        default: []
    }

});

const GameState = mongoose.model("Game-State", GameStateSchema);

module.exports = GameState;

// socket to be used to tell the other player it is their turn?