import React, { useState, useEffect } from "react";

function GamesList(props) {
    // if logged in, present join game buttons otherwise display login form
    // when join game button is pressed, display waiting for opponent pop up (how will we know when other player)
    return (
        <ul>
            <li>{props.name} {props.needPlayerTwo === "true" ?
                <button value={props.id} onClick={props.handleJoin} >Join Game</button>
                : ""} </li>
        </ul>
    )
}


export default GamesList;
