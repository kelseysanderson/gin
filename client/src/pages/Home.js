import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../components/Login"
import Game from "./Game"
import ActiveGames from "../components/ActiveGames";
import API from "../utils/API";
import Cookies from 'universal-cookie';
import "./home.css"

function Home() {
  const [formObject, setFormObject] = useState({});
  const cookies = new Cookies();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleLoginSubmit(event) {
    console.log("BUTTON")
    event.preventDefault()
    API.authLogin({
      email: formObject.email,
      password: formObject.password,
    }).then(res => {
      console.log(res.data.user.savedUser._id)

      cookies.set('user',
        JSON.stringify({
          email: formObject.email,
          id: res.data.user.savedUser._id,
          isLoggedIn: true
        }))
      window.location.replace('/options/' + res.data.user.savedUser._id);
    }).catch(err => {
      if (err.response.data.error)
        alert(err.response.data.error)
      else
        alert(err)
    });
  }

  function handleSignupSubmit(event) {
    event.preventDefault()
    API.saveUser({
      email: formObject.email,
      password: formObject.password,
    }).then(res => {
      cookies.set('user',
        JSON.stringify({
          email: formObject.email,
          id: res.data.user.user._id,
          isLoggedIn: true
        }))
      window.location.replace('/options/' + res.data.user.user._id);
    }).catch(err => {
      if (err.response.data.error)
        alert(err.response.data.error)
      else
        alert(err)
    });
  };

  return (
    <div className="home">
      <div>
        <h1 className="header-text">GIN</h1>
      </div>
      <Login
        handleSignupSubmit={handleSignupSubmit}
        handleInputChange={handleInputChange}
        handleLoginSubmit={handleLoginSubmit}
      />
    </div>
  )
}

export default Home;
