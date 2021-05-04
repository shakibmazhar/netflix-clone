import React from 'react'
import {Link} from 'react-router-dom'
import '../Error.css'

const Error = () => {
    return (
        <div className = 'error'>
            <h2 className = 'error_text'>Oops! That's a dead end!</h2>
            <Link to = '/'>
                <div className = 'error_btn'>
                    <p>Back home</p>
                </div>
            </Link>
        </div>
    )
}

export default Error
