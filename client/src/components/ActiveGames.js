import React from 'react';
import { Table } from "react-bootstrap";
import "./activegames.css"

function ActiveGames(props) {
  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.needPlayerTwo === "true" ? <button value={props.id} onClick={props.handleJoin} className="join-game-btn" >Join Game</button> : <p>Game in Session</p>}</td>
      </tr>
  )
}

export default ActiveGames


