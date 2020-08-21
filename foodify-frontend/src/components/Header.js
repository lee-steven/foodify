import React, { useState } from 'react'
import Modal from 'react-modal'
import logo from '../images/logo.png'
import StarIcon from '../images/star.svg'
import BellIcon from '../images/bell.svg'
import UserIcon from '../images/user.svg'
import LogoutIcon from '../images/log-out.svg'
import styled from 'styled-components'
import auth from '../services/auth'
import { useHistory } from 'react-router-dom'

// TODO: Add cursor pointer on hover for navigation
// CSS
const logoutButton = {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#292929',
    cursor: 'pointer',
    outline: 'none',


}
const modalStyle = {
    overlay: {
        backgroundColor: 'transparent',
        width: '100%',
        top: '20px',
    },
    content: {
        overflow: 'visible',
        padding: 10,
        height: '25px',
        width: '130px',
        right: '40px',
        left: 'auto',
        
    }
}
Modal.setAppElement('#root')

const Header = () => {
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
                    <span onClick={(() => isOpen ? setIsOpen(false) :setIsOpen(true))}> 
                        <img src={UserIcon} alt="User Icon" />
                        <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px', zIndex:-1}}>Account</label>
                           <Modal
                                isOpen={isOpen}
                                style={modalStyle}
                                onRequestClose={(() => setIsOpen(false))}
                                contentLabel='Account Modal'
                            >
                                <button onClick={handleLogout} style={logoutButton}>
                                    <img src={LogoutIcon} alt='Log out Icon' />
                                    <span style={{ position: 'relative', top: '-4px', paddingLeft: '17px'}}>Log out</span>
                                </button>
                                <ModalArrow />
                            </Modal>
                    </span>
                </span>
            </span>
         
        </nav>
    )
}

const ModalArrow = styled.div`
    content: '';
    height: 7px;
    width: 7px;
    position: absolute;
    background-color: white;
    top: -5px;
    left: 45%;
    border-top: lightgray solid 1px;
    border-left: lightgray solid 1px;
    transform: rotate(45deg);
`

export default Header