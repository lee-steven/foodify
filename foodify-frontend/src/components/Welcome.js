import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div>
            <h1>Welcome to foodify</h1>
            <Link to='/home'>
            <button>Use foodify</button>
            </Link>
        </div>
    )
}

export default Welcome