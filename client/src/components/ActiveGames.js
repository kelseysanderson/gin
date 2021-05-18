import React from 'react';
import Table from "react-bootstrap/Table";



function ActiveGames() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Room #</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
        </tr>
      </tbody>
    </Table>
         
  )
}

export default ActiveGames


