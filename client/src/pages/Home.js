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

  function handleLogout() {
    console.log("here!")
    cookies.remove('user')
  }

  return (
   <div>
      {isLoggedIn() === true ? (
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <button onClick={handleLogout} class="nav-link" href="#">Logout</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        // render create game and join game buttons
        // list of current games
        // rules for gin
      ) : (
        <div> 
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>

              </ul>
            </div>
          </nav>
          <Login
            handleSignUp={handleSignUp}
            handleInputChange={handleInputChange}
          />
        </div>
      )
    }
    </div>
  )
}

export default Home;
