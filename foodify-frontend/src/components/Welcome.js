import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import greenBackground from '../images/greensBackground.png'
// import background from '../images/background.png'

const logInButton = {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: 'white',
    position: 'relative', 
    top: '10px',
    paddingRight: '40px',
    cursor: 'pointer',
    outline: 'none',
}
const signUpButton = {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#48AB5F',
    position: 'relative', 
    top: '10px',
    cursor: 'pointer',
    outline: 'none',

}
const inputField = {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '7px 14px',
    width: '240px',
    height: '20px',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    outline: 'none'
}
const submitButton = {
    backgroundColor: '#48AB5F',
    color: 'white',
    border: '1px solid #48AB5F',
    borderRadius: '5px',
    padding: '7px 12px',
    height: '37px',
    width: '100px',
    fontSize: '15px',
    marginLeft: '25px',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    cursor: 'pointer', 
    outline: 'none'
}
const background = {
    margin: 0,
    padding: 0,
    width: '45vw',
    height: '100vh',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: '-1',
    overflow: 'hidden'
}
// const backgroundStyle = {
//     position: 'absolute',
//     top: -40,
//     right: -50,
//     height: '105vh',
//     overflow: 'hidden',
//     zIndex: -1,
    
// }
// const backgroundOverlay ={
//     position: 'absolute',
//     top: -40,
//     right: -50,
//     height: '105vh',
//     width: '60vw',
//     overflow: 'hidden',
//     zIndex: 1, 
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',

//     backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
// }
const Welcome = () => {
    return (
        <div style={{overflow: 'hidden'}}>
            <nav style={{display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '20px 40px', zIndex: 2}}>
                <span style={{display: 'inline-block'}}>
                    <img src={logo} alt='foodifyLogo'  height='40px' style={{display: 'inline-block'}}/>
                    <h2 style={{display: 'inline-block', color: '#292929', position: 'relative', bottom: '10px', paddingLeft: '15px'}}>foodify</h2>
                </span>
                <span style={{textAlign: 'right'}}>
                    <Link to='/login'>
                        <button style={logInButton}>log in</button>
                    </Link>
                    <Link to='/signup'>
                        <button style={signUpButton} >sign Up</button>
                    </Link>
                </span>
            </nav>

            <div style={{display: 'grid', gridTemplateColumns: '2fr 3fr', padding: '12vh 8vw'}}>
                <div>
                    <h1 style={{ fontSize: '55px', color: '#292929'}}>Reduce food waste</h1>
                    <p style={{ fontSize: '24px', color: 'gray'}}>
                        Get notifications on your grocery expiration date, get recipes based on your groceries, and more.
                    </p>
                    <form>
                        <input type='text' placeholder='Enter your email address...' style={inputField}/>
                        <Link to='/signup'>
                            <button type='submit' style={submitButton}>sign up</button>
                        </Link>
                    </form>
                </div>
                <div>
                    <img src={greenBackground} alt='greenBackground' style={background} />
                    {/* <img src={background} alt='background' style={backgroundStyle}/>
                    <div style={backgroundOverlay}></div> */}
                </div>
            </div>
        </div>
    )
}

export default Welcome