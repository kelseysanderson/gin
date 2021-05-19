import React from 'react';

function GamesRow(props) {
    return (
        <tr {...props}>
            <td>{props.name}</td>
            <td>Mark</td>
        </tr>
    )
}

export default GamesRow
