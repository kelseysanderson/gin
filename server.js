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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cardgame" , {     
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//Gypsy Sockets
io.on("connection", function(socket){
  console.log('made socket connection')

  socket.on("update_state", function(newState, room_id) {
    console.log('update_state' + room_id)
    io.sockets.emit('update_state' + room_id, newState)
  })

  socket.on("update_playerOne", function(newPlayerOne, room_id) {
    io.sockets.emit('update_playerOne' + room_id, newPlayerOne)
  })

  socket.on("update_playerTwo", function(newPlayerTwo, room_id) {
    io.sockets.emit("update_playerTwo" + room_id, newPlayerTwo)
  })

  socket.on("disconnect" , function() {
    console.log("disconnected")
  })

})

server.listen(PORT + 1, function() {
  console.log(`🌎  ==> Socket Server now listening on PORT ${PORT + 1}`)
})
