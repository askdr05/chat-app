import React, { useEffect } from 'react'
import "./_MyProfile.scss"
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { logOut } from '../../redux/slices/user/userApi';
import { Link, useNavigate } from 'react-router-dom';


const MyProfile = ({ handleClose, show }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loggedOutMessage } = useSelector(state => state.user)
    useEffect(() => {
        if (loggedOutMessage) {

            navigate("/login")

        }
    }, [loggedOutMessage, dispatch,navigate])

    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='imageContainer'>
                        <img 
                        src={user.avatar.url? user.avatar.url : 'https://cdn-icons-png.flaticon.com/512/3106/3106773.png' } 
                        alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' 
                        />
                    </div>
                    <p
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center"
                        }}
                    >
                        {user.email}
                    </p>
                    <div className='profileUpdateButtons'>
                        <Link to='/me/update'>
                            <button>Update Profile</button>
                        </Link>
                        <Link to='/me/update/password'>
                            <button>Update Password</button>
                        </Link>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(logOut())}>
                        logout
                    </Button>
                </Modal.Footer>
            </Modal >
            {/* <ToastContainer /> */}
        </>
    )
}

export default MyProfile
