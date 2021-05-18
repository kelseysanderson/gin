const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cardgame");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});



//Socket
io.on("connection", function(socket){
  console.log('made socket connection')

  socket.on("update_state", function(newState) {
    console.log(newState)
    io.sockets.emit("update_state", newState)
  })

  socket.on("update_playerOne", function(newPlayerOne) {
    console.log(newPlayerOne)
    io.sockets.emit("update_playerOne", newPlayerOne)
  })

  socket.on("update_playerTwo", function(newPlayerTwo) {
    console.log(newPlayerTwo)
    io.sockets.emit("update_playerTwo", newPlayerTwo)
  })
})

server.listen(PORT + 1, function() {
  console.log(`🌎  ==> Socket Server now listening on PORT ${PORT + 1}`)
})
