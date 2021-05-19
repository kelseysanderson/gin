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
          console.log("HEReE" ,res.data)
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
          <div className="row justify-content-around">
            <div className="col-4">
              <button id="create-game-btn" onClick={handleCreate}>+ Create New Game</button>
            </div>
            <div className="col-7">
              <h2 ClassName="active-games">Active Games<button id="refresh-btn" onClick={handleRefresh}>&#10227;</button>
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
