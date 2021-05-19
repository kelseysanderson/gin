import React from 'react';
import { Table } from "react-bootstrap";
import "./activegames.css"

function ActiveGames(props) {
  return (
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.needPlayerTwo === "true" ? <button value={props.id} onClick={props.handleJoin} >Join Game</button> : <p>In Game</p>}</td>
      </tr>
    </tbody>

  )
}

export default ActiveGames


