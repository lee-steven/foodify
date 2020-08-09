import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import foodifyLogo from '../images/logo.png'
import background from '../images/backgroundImage.jpg'

const backgroundContainer = {
    height: '100%',
    background: `linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(${background})`,
    backgroundPosition: 'center',
}

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
    width: '335px',
    height: '30px',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    marginBottom: '8px', 
    color: 'gray',
    fontSize: '14px',
    padding: '5px 15px',
}
const styleButton = {
    border: 'none',
    width: '368px',
    backgroundColor: '#39B54A',
    color: 'white',
    borderRadius: '5px',
    padding: '13px 10px',
    margin: '10px 0',
    fontFamily: 'degular, arial',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
}
const redirectLink = {
    border: 'none', 
    backgroundColor: 'transparent',
    padding: '0', 
    fontFamily: 'degular, Helvetica, Arial, sans-serif', 
    fontWeight: 600,
    outline: 'none', 
    cursor: 'pointer',
    color: '#39B54A',
}

const Signup = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState(' ')
    const history = useHistory()

    const handleSignup = async (event) => {
        event.preventDefault()
    }

    return (
        <div style={backgroundContainer}>
        <div style={{margin: '0 auto', paddingTop: '14vh', width: '430px', height: 'auto',}}>
            <span>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </span>
            <div style={ container }>
                <div style={{marginBottom: '12px'}}>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Welcome to foodify!</h2>
                </div>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <label style={label}>Full Name</label>
                        <input type='text' value={name} onChange={({target}) => setName(target.value)} style={styleInputField} />
                    </div>
                    <div>
                        <label style={label}>Email</label>
                        <input type='text' value={email} onChange={({target}) => setEmail(target.value)} style={styleInputField} />
                    </div>
                    <div>
                        <label style={label}>Password</label>
                        <input type='password' style={styleInputField} value={password} onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    
                    <button style={styleButton} type='submit'>Create your account</button>
                </form>

                <div style={{marginTop: '10px', fontSize: '15px'}}>
                <label>Already have an account? </label>
                <Link to='/login'>
                    <button style={redirectLink}>Log in</button>
                </Link>
            </div>

            </div>
        </div>
        </div>
    )
}

export default Signup