import React, { useState } from 'react'
import "./_Header.scss"
import { MdNotificationsActive, MdSearch } from "react-icons/md"

import { useSelector } from 'react-redux';
import MyProfile from '../popUpModel/MyProfile';


const Header = ({ handelSidebar }) => {
    const { user } = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const { allNotifications } = useSelector(state => state.notification)
    return (
        <div className='header'>
            <p>
                < MdSearch size={22} onClick={handelSidebar} />
                
                   
                <MdNotificationsActive size={22} /> 
              
                {allNotifications[0] &&
                  <span className='NotificationsBadge'>{allNotifications.length}</span>}
            </p>
            <span>Chit-Chat</span>
            <img
                src={user.avatar.url ? user.avatar.url : 'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'}
                alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png'
                onClick={handleShow} />
            <MyProfile
                handleClose={handleClose}
                show={show}
            />
            
        </div>
    )
}

export default Header
