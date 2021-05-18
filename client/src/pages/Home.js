import React, { useState } from "react";
import  { Redirect } from 'react-router-dom'
import Login from "../components/Login";
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
      cookies.set('user',
        JSON.stringify({
          email: formObject.email,
          id: res.data.user.savedUser._id,
          isLoggedIn: true
        }))
        window.location.replace('http://localhost:3000/options/' + res.data.user.savedUser._id);
    }).catch(err => console.log(err));
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
        }), )
        window.location.replace('http://localhost:3000/options/' + res.data.user.user._id);
        ;
    }).catch(err => console.log(err));
  };

  return (
    <div>

        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Gin Rummy </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>

              </ul>
            </div>
          </nav>
          <Login
            handleSignupSubmit={handleSignupSubmit}
            handleInputChange={handleInputChange}
            handleLoginSubmit={handleLoginSubmit}
          />
        </div>
    </div>
  )
}

export default Home;
