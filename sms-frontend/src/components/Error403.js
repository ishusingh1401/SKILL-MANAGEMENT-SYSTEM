import React from 'react'
import { Link } from 'react-router-dom';
import './403.css'

const Error403 = () => {
    return (
        <div>
            <div id="app" className="error403">
                <div>403</div>
                <div className="txtt">Access Denied<span className="blink">_</span></div>
                <div className="txt">&#10060;You don't have permission to access this server&#10060;</div>
                <Link to="/"> go to homepage</Link>
            </div>
        </div>
    )
}

export default Error403
