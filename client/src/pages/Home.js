import React, { useState, useEffect } from "react";
import "./home.css"
import Login from "../components/Login"

function Home() {
  // if logged in, present join game buttons otherwise display login form
  // when join game button is pressed, display waiting for opponent pop up (how will we know when other player)
  const [user, setUser] = useState([])
  const [formObject, setFormObject] = useState({})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
    console.log(formObject)
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("BUTTON");
  };

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Game</h1>
      </div>
      <Login
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />
    </div>

  )
}


export default Home;
