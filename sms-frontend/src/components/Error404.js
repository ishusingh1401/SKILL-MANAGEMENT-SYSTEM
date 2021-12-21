import React from 'react'
import './404.css'
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div>
            <div className="main_body">
                <div className="center_body">
                    <h1>404</h1>
                    <h2>PAGE NOT FOUND</h2>
                    <p style={{ fontSize: "26px" }}>&#128567; &#128681; It seems that you have lost your way &#128681;&#128567;</p>
                    {localStorage.getItem("user") === null ? <Link to="/">Please Login</Link> : <Link to="/home"> go to homepage</Link>}
                </div>
            </div>
        </div>
    )
}
