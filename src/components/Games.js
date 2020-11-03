import React from 'react'

function Games({ games }) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col">
                    "name:"
                </div>
                <div className="col">
                    "status:"
                </div>
            </div>
            <ul className="list-group">
                {games.map((game, index) => {
                    return (<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {game.name}
                        <span className="badge badge-primary badge-pill">{game.status}</span>
                    </li>)
                })}
            </ul>

        </div>
    )
}


export default Games