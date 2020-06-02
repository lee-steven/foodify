import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'

// import loginService from '../services/login'

import foodifyLogo from '../images/logo.png'

const container = {
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    padding: '15px 30px 40px 30px'
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

const Signup = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState(' ')
    const history = useHistory()

    const handleSignup = async (event) => {
        event.preventDefault()
    }

    return (
        <div style={{margin: '0 auto', paddingTop: '18vh', width: '430px', height: 'auto',}}>
            <span>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </span>
            <div style={ container }>
                <div style={{marginBottom: '12px'}}>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Create account</h2>
                </div>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <label style={label}>Email</label>
                        <input type='text' value={email} onChange={({target}) => setEmail(target.value)} style={styleInputField} />
                    </div>
                    <div>
                        <label style={label}>Password</label>
                        <input type='password' style={styleInputField} value={password} onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <div>
                        <label style={label}>Confirm Password</label>
                        <input type='password' style={styleInputField} value={password} onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <button style={styleButton} type='submit'>Sign up</button>
                </form>

            </div>

            <div style={{marginTop: '10px', fontSize: '15px', padding: '10px'}}>
                <label>Already have an account?</label><br/>
                <button>Log in</button>
            </div>
        </div>
    )
}

export default Signup