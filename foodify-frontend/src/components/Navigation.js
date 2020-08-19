import React, {useState} from 'react'
import Modal from 'react-modal'
import logo from '../images/logo.png'
import StarIcon from '../images/star.svg'
import BellIcon from '../images/bell.svg'
import UserIcon from '../images/user.svg'

import auth from '../services/auth'
import { useHistory } from 'react-router-dom'

// CSS
const logoutButton = {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#292929',
    position: 'relative', 
    top: '13px',
    cursor: 'pointer',
    outline: 'none', float: 'right', paddingRight: '50px', textDecoration: 'underline'
}
const modalStyle = {
    overlay: {
        backgroundColor: 'transparent',
        height: '60px',
        width: '230px',
        right: '30px',
        left: '80%',
        top: '20px',
    },
    content: {
    }
}

const Navigation = () => {
    const history = useHistory()
    const [ isOpen, setIsOpen ] = useState(false)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedFoodifyUser')
        auth.logout()
        history.push('login')
    }

    return(
        <nav style={{height: '5%', margin: 0, padding: '10px 0 30px 0', borderBottom: '1px solid #E0E0E0'}}>
            
            <span style={{ paddingLeft: '40px', margin: '10px 0'}}>
                <img src={logo} alt='foodify Logo' height='40px' style={{ display: 'inline-block', paddingRight: '15px'}}/>
                <h3 style={{ fontSize: '24px', color: '#292929', display: 'inline-block', position: 'relative', top: '-10px' }}>foodify</h3>
            </span>
            <span style={{ float: 'right', paddingRight: '70px', position: 'relative', top: '22px'}}>
                <span style={{padding: '0 15px',}}>
                    <img src={StarIcon} alt="Star Icon" />
                    <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px'}}>Favorites</label>
                </span>
                <span style={{padding: '0 15px',}}>
                    <img src={BellIcon} alt="Bell Icon" />
                    <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px'}}>Notifications</label>
                </span>
                <span style={{padding: '0 15px',}} >
                    <span onClick={(() => setIsOpen(true))}>
                        <img src={UserIcon} alt="User Icon" />
                        <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px'}}>Account</label>
                    </span>
                </span>
            </span>
            {/* <Modal
                isOpen={isOpen}
                style={modalStyle}
            >
                 <button onClick={handleLogout}>log out</button>
            </Modal> */}
        </nav>
    )
}

export default Navigation