import axios from "axios";

export default {
  // Gets all Users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the User with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the User with the given id, unregister?
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // save user after sign up
  saveUser: function(userData) {
    return axios.post("/api/auth/signup", userData)
  },
  // check for login match in database 
  authLogin: function(userData) {
    return axios.post("/api/auth/login", userData)
  },
  // Gets all Games
  getGames: function () {
    return axios.get("/api/game");
  },
  // Gets the Game with the given id
  getGame: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the Game with the given id
  deleteGame: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a Game to the database
  saveGame: function (gameData) {
    return axios.post("/api/game", gameData);
  },
};