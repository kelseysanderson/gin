import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import API from "../utils/API";
import Cookies from 'universal-cookie';
import StatsTable from "../components/StatsTable"
import './stats.css'

function Options() {
    const [userHistory, setUserHistory] = useState([]);
    const [stats, setStats] = useState([]);
    const cookies = new Cookies();
    let username;
    const { id } = useParams()
    const userId = id

    useEffect(() => {
        console.log(userHistory)
        loadHistory();
        loadStats();
    }, []);

    function loadHistory() {
        API.getUser(userId)
            .then(res =>
                setUserHistory(res.data.history),
            )
            .catch(err => console.log(err));
    };

    function loadStats() {
        API.getUser(userId)
            .then(res => {
                setStats({
                    username: res.data.email,
                    wins: res.data.numberOfWins,
                    losses: res.data.numberOfLosses,
                    percent: (((res.data.numberOfWins / (res.data.numberOfWins + res.data.numberOfLosses)) * 100) + "%")
                });
            })
            .catch(err => console.log(err));
    };

    function goBack() {
        window.location.replace('/options/' + cookies.get('user').id)
    }

    return (
        <div className="stats">
            <header className="options-header">
                <h1 className="options-text"> {stats.username}'s Stats</h1>
                <button id="back-to-options"  onClick={goBack}>Home</button>
            </header>

            {!userHistory.length ? (

                <h2 id="no-history"> No History Available</h2>

            ) : (

                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-5">
                            <div className="table-responsive">

                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th className="table-header-text">Wins: {stats.wins}</th>
                                            <th className="table-header-text">Losses: {stats.losses}</th>
                                            <th className="table-header-text">Percent Won: {stats.percent}</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="table-responsive">

                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th className="table-header-text">#</th>
                                            <th className="table-header-text">Player One</th>
                                            <th className="table-header-text">Player Two</th>
                                            <th className="table-header-text">Score</th>
                                        </tr>
                                    </thead>
                                    {userHistory.map(userHistory => (
                                        <StatsTable
                                            key={userHistory._id}
                                            playerOne={userHistory.playerOneName}
                                            playerTwo={userHistory.playerTwoName}
                                            score={userHistory.score}
                                        />
                                    ))}
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}
export default Options;