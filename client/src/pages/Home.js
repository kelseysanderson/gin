import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../components/Login"
import Game from "./Game"
import API from "../utils/API";
import Cookies from 'universal-cookie';
import "./home.css"

function Home() {
  // if logged in, present join game buttons otherwise display login form
  // when join game button is pressed, display waiting for opponent pop up (how will we know when other player)
  const [formObject, setFormObject] = useState({})
  const cookies = new Cookies();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
    console.log(formObject)
  };

  // if not logged in, redirect to login page 
  // need login method and sign up method to save user info/loggedIn info to cookie
  function handleSignUp(event) {
    event.preventDefault();
    API.saveUser({
      email: formObject.email,
      password: formObject.password,
    }).then(res => {
      cookies.set('user',
        JSON.stringify({
          email: formObject.email,
          id: res.data._id,
          isLoggedIn: true
        }), { path: '/' });
    }).then(res => console.log("LOGGED IN?: " + isLoggedIn()))
      .catch(err => console.log(err));
  };

  function isLoggedIn() {
    if (!cookies.get('user')) {
      return false;
    } else if (cookies.get('user').isLoggedIn) {
      return true
    }
  }

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Game</h1>
      </div>
      {isLoggedIn() === true ? (
        // render create game and join game buttons
        // list of current games
        // rules for gin
        <Game />
      ) : (
        <Login
          handleSignUp={handleSignUp}
          handleInputChange={handleInputChange}
        />
      )
      }
    </div>
  )
}

export default Home;
