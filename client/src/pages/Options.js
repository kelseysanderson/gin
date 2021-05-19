.options-header{
  display:flex;
  width: 100%;
  justify-content:space-between;
  flex-wrap: wrap;
  border-bottom: 3px solid white;
  margin-bottom: 50px;
}
.options-text {
  color:#e2e2e2 ;
}
.options {
  min-height:100vh;
  min-width: 100%;
  overflow: auto;
  background-image: url('./cards.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.options-text {
  font-size: 50px;
  padding-top: 40px;
  padding-left: 50px;
}
.active-games {
  color: whitesmoke;
  text-align:center;
  margin-top: 10px;
  font-size: 45px;
}
.logout-button {
  padding-top:35px;
  pointer-events: none;
  padding-right: 50px;
}
.rules-text {
  background-color: rgba(60, 60, 61, 0.95) !important;
  color:white;
  padding:50px;
  font-size: 18px;
}
#create-game-btn{
  padding: 15px;
  border: 4px dashed white;
  background-color: rgba(127, 127, 127, 0.95) ;
  color:white ;
  border-radius: 10px ;
  font-size: 30px;
  margin-bottom: 30px;
}
#create-game-btn:hover{
  padding: 15px;
  border: 4px dashed whitesmoke;
  background-color: rgba(205, 205, 205, 0.95) ;
  color:black ;
  border-radius: 10px ;
  font-size: 30px;
  margin-bottom: 30px;
}
#refresh-btn {
  padding: 10px;
  background:none;
  border:none;
  color:white;
  font-size: 33px;
  width: 60px;
  border-radius: 20px;
  margin-left: 15px;
  margin-bottom: 50px;
}
.rules-header {
  text-align: center;
  font-size: 35px;
  padding-bottom: 20px;
  width: 100%;
}
.how-to-play {
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  padding-top: 20px;
  padding-bottom: 30px;
}
New
1:22
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";
import API from "../utils/API";
import ActiveGames from "../components/ActiveGames"
import Cookies from 'universal-cookie';
import './options.css'
function Options() {
const [games, setGames] = useState([]);
const cookies = new Cookies();
const username = cookies.get('user').email;
// const username = name.match(/^([^@]*)@/)[1];
// const username = regexUsername.charAt(0).toUpperCase() + regexUsername.slice(1);
// document.body.style.background = "red";
useEffect(() => {
  loadGames()
}, [])
function loadGames() {
  API.getActiveGames()
    .then(res =>
      setGames(res.data)
    )
    .catch(err => console.log(err));
};
function handleJoin(e) {
  console.log(e.target.value)
  API.getGame(e.target.value)
    .then(res => {
      if (res.data.needPlayerTwo === false) {
        return
      } else {
        console.log("HEReE", res.data)
        API.updateGame(res.data._id, {
          playerTwo: cookies.get('user').id,
          needPlayerTwo: false
        }).then(res =>
          window.location.replace('/game/' + res.data._id)
        )
      }
    })
}
function handleCreate() {
  API.saveGame({
    playerOne: cookies.get('user').id,
    playerOneName: cookies.get('user').email,
    isActiveGame: true,
    needPlayerTwo: true
  }).then(res =>
    window.location.replace('/game/' + res.data._id)
  )
};
function handleRefresh(event) {
  event.preventDefault();
  window.location.reload()
}
function handleLogout(event) {
  event.preventDefault();
  cookies.remove('user')
  window.location.replace('/home');
}
return (
  <div className="options">
    <div>
      <header className="options-header">
        <h1 className="options-text">Welcome, {username} </h1>
        <a className="nav-link" href="#"><button className="logout-button" onClick={handleLogout}  >Logout</button></a>
      </header>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-6">
            <button id="create-game-btn" onClick={handleCreate}>+ Create New Game</button>
            <div className="rules-text">
            <h3 className="rules-header">How to Play</h3>
            <p className="how-to-play">The object of the game is to collect a hand where most or all of the cards can be combined into sets and runs and the point value of the remaining unmatched cards is low.
            a run or sequence consists of three or more cards of the same suit in consecutive order, such as club4, club5, club6 or heart7, heart8, heart9, heart10, heartJ.
            a set or group is three or four cards of the same rank, such as diamond7, heart7, spade7.
            A card can belong to only one combination at a time - you cannot use the same card as part of both a set of equal cards and a sequence of consecutive cards at the same time. For example if you have diamond7, spade7, heart7, heart8, heart9 you can use the heart7 either to make a set of three sevens or a heart sequence, but not both at once. To form a set and a sequence you would need a sixth card - either a club7 or a heart10.
            Note that in Gin Rummy the Ace is always low. A-2-3 is a valid sequence but A-K-Q is not.
            </p>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <h2 className="active-games">Active Games<button id="refresh-btn" onClick={handleRefresh}>&#10227;</button>
            </h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Join</th>
                </tr>
              </thead>
              {games.map(game => (
                <ActiveGames
                  key={game._id}
                  id={game._id}
                  name={game.playerOneName}
                  handleJoin={handleJoin}
                  needPlayerTwo={game.needPlayerTwo ? "true" : ""}
                />
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
export default Options;