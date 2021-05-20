import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import API from "../utils/API";
import Cookies from 'universal-cookie';
import StatsTable from "../components/StatsTable"
import './stats.css'

function Options() {
    const [user, setUser] = useState([]);
    const cookies = new Cookies();
    const username = cookies.get('user').email;

    useEffect(() => {
        loadStats()
    }, []);

    function loadStats() {
        API.getUser(cookies.get('user').id)
            .then(res =>
                setUser(res.data)
            )
            .catch(err => console.log(err));
    };

    function goBack (){
        window.location.replace('/options/' + cookies.get('user').id)
    }

    return (
        <div className="stats">
                        <header className="options-header">
                            <h1 className="options-text"> {username}'s Stats</h1>
                            <button className="logout-button" onClick={goBack}>Back to Options</button>
                        </header>
                        <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className="table-header-text">Wins</th>
                                    <th className="table-header-text">Losses</th>
                                    <th className="table-header-text">TBD</th>
                                    <th className="table-header-text">TBD</th>
                                </tr>
                            </thead>

                            <StatsTable
                                key={user._id}
                                id={user._id}
                            />

                        </Table>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Options;