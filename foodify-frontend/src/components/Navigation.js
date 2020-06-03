import React from 'react'
import logo from '../images/logo.png'

const Navigation = () => {

    return(
        <nav style={{height: '5%', margin: 0, padding: '10px 0 15px 0', borderBottom: '1px solid #E0E0E0'}}>
            <span style={{ paddingLeft: '40px', margin: '10px 0'}}>
                <img src={logo} alt='foodify Logo' height='40px' style={{ display: 'inline-block', paddingRight: '15px'}}/>
                <h3 style={{ fontSize: '24px', color: '#292929', display: 'inline-block', position: 'relative', top: '-10px' }}>foodify</h3>
                <button style={{   border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#292929',
    position: 'relative', 
    top: '13px',
    cursor: 'pointer',
    outline: 'none', float: 'right', paddingRight: '50px'}}>log out</button>
            </span>
        </nav>
    )
}

export default Navigation