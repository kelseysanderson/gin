import React from 'react';

function ActiveGames(props) {
  return (
    <tbody>
      <tr>
        <td className="counterCell"></td>
        <td>{props.playerOne}</td>
        <td>{props.playerTwo}</td>
        <td>{props.score}</td>
      </tr>
    </tbody>

  )
}

export default ActiveGames

