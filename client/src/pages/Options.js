import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";
import GamesList from "../components/GamesList"
import Cookies from 'universal-cookie';

function Options() {
  const [games, setGames] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    loadGames()
  }, [])

  function loadGames() {
    API.getGames()
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
          console.log("IDDD", res.data._id)
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

  function handleLogout(event) {
    event.preventDefault();
    cookies.remove('user')
    window.location.replace('/home');
  }

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Gin Rummy</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><button className="logout-button" onClick={handleLogout}  >Logout</button></a>
              </li>
            </ul>
          </div>
        </nav>
        <ul>
          {games.map(game => (
            <GamesList
              key={game._id}
              id={game._id}
              name={game.playerOneName}
              handleJoin={handleJoin}
              needPlayerTwo={game.needPlayerTwo ? "true" : ""} />
          ))}
        </ul>
        <button onClick={handleCreate}>create</button>
      </div>
    </div>
  )
}

export default Options;
