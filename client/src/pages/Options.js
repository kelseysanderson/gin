import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Table } from "react-bootstrap";
import API from "../utils/API";
import ActiveGames from "../components/ActiveGames"
import Cookies from 'universal-cookie';
import './options.css'

function Options() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState([]);
  const cookies = new Cookies();
  const { id } = useParams()
  const userId = id

  useEffect(() => {
    loadGames()
    loadUser()
    // console.log(userId)
    // setCookie()
  }, []);

  // function setCookie () {
  //   cookies.set('user',
  //   JSON.stringify({
  //     id: userId,
  //     isLoggedIn: true
  //   }))
  // }

  function loadUser() {
    API.getUser(userId)
      .then(res =>
        setUser({
          username: res.data.email,
        }),
      )
      .catch(err => console.log(err));
  };

  function loadGames() {
    API.getActiveGames()
      .then(res => {
        setGames(res.data)
      })
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
            playerTwo: userId,
            playerTwoName: user.username,
            needPlayerTwo: false
          }).then(res => 
            window.location.replace('/game/' + res.data._id)
        )};
      });
  }

  function handleCreate() {
    API.saveGame({
      playerOne: userId,
      playerOneName: user.username,
      isActiveGame: true,
      needPlayerTwo: true
    })
      .then(res =>
        window.location.replace('/game/' + res.data._id)
      );
  };

  function handleViewStats() {
    window.location.replace('/stats/' + userId);
  }

  function handleRefresh(event) {
    event.preventDefault();
    window.location.reload();
  }

  function handleLogout(event) {
    event.preventDefault();
    cookies.remove('user');
    window.location.replace('/home');
  }

  return (
    <div className="options">
      <div>
        <header className="options-header">
          <h1 className="options-text">Welcome, {user.username} </h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </header>
        <div className="container-fluid">
          <div className="row justify-content-around">
            <div className="col-12 col-md-5">
              <button id="create-game-btn" onClick={handleCreate}>+ Create New Game</button>
              <button id="view-stats-btn" onClick={handleViewStats}>View Stats</button>
              <div className="rules-text">
                <h3 className="rules-header">How to Play</h3>
                <div className="how-to-play">
                  <p >
                  The object of the game is to collect a hand where most or all of the cards can be combined into sets and runs and the point value of the remaining unmatched cards is low.
                  a run or sequence consists of three or more cards of the same suit in consecutive order, such as &clubs;4, &clubs;5, &clubs;6 or &hearts;7, &hearts;8, &hearts;9, &hearts;10, &hearts;J.
                  a set or group is three or four cards of the same rank, such as &diams;7, &hearts;7, &spades;7.
                  </p>
                  <p>
                  A card can belong to only one combination at a time - you cannot use the same card as part of both a set of equal cards and a sequence of consecutive cards at the same time.
                  For example if you have &diams;7, &spades;7, &hearts;7, &hearts;8, &hearts;9 you can use the &hearts;7 either to make a set of three sevens or a &hearts; sequence, but not both at once. To form a set and a sequence you would need a sixth card - either a &clubs;7 or a  &hearts;10.
                  Note that in Gin Rummy the Ace is always low. A-2-3 is a valid sequence but A-K-Q is not.
                </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="active-games-refresh">
                <h2 className="active-games">Active Games</h2>
                <button id="refresh-btn" onClick={handleRefresh}>&#10227;</button>
              </div>
              <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th className="table-header-text">Creator</th>
                      <th className="table-header-text">Join Game</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map(game => (
                      <ActiveGames
                        key={game._id}
                        id={game._id}
                        name={game.playerOneName}
                        handleJoin={handleJoin}
                        needPlayerTwo={game.needPlayerTwo ? "true" : ""}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Options;