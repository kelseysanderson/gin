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

  function handleJoin() {
    // console.log("JOIN")
    // API.getGame ({
    // }) 
  }

  function handleCreate() {
    console.log(cookies.get('user'))
    API.saveGame({
      playerOne: cookies.get('user').id,
      isActiveGame: true,
      needPlayerTwo: true
    })
  };

  function handleLogout(event) {
    console.log(cookies.get('user').isLoggedIn)
    event.preventDefault();
    console.log("BUTTON")
    cookies.remove('user')
    window.location.replace('http://localhost:3000/home');
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
            <GamesList key={game._id} name={game.playerOne} isActiveGame={game.needPlayerTwo ? "true" : ""} />
          ))}
        </ul>
        <button onClick={handleCreate}>create</button>
        <button onClick={handleJoin}>join</button>
      </div>
    </div>
  )
}

export default Options;
