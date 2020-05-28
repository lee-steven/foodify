import React from 'react'

import foodifyLogo from '../images/logo.png'

const container = {
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    padding: '15px 30px 30px 30px'
}
const label = {
    fontSize: '13px',
    marginBottom: '5px',
    display: 'block'
}
const styleInputField = {
    width: '360px',
    height: '30px',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    marginBottom: '8px', 
    color: 'gray',
    fontSize: '14px',
    padding: '3px'
}
const styleButton = {
    border: 'none',
    width: '368px',
    backgroundColor: '#48AB5F',
    color: 'white',
    borderRadius: '5px',
    padding: '9px 10px',
    margin: '10px 0',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
}

const Login = () => {
    return (
        <div style={{margin: '20vh auto', width: '430px'}}>
            <span>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </span>
            <div style={ container }>
                <div style={{marginBottom: '12px'}}>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Sign in</h2>
                    <p style={{textDecoration: 'underline', fontSize: '12px', display: 'inline-block', float: 'right', position: 'relative', bottom: -6, color: '#636363'}}>Forgot password?</p>
                </div>
                <form>
                    <div>
                        <label style={label}>Email</label>
                        <input type='text' style={styleInputField} />
                    </div>
                    <div>
                        <label style={label}>Password</label>
                        <input type='password' style={styleInputField} />
                    </div>
                    <button style={styleButton}>Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default Login