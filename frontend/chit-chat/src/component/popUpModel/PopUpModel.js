import React, { useContext, useEffect, useState } from 'react'
import "./_PopUpModel.scss"
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllUsers } from '../../redux/slices/user/userApi'
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { MdOutlineCancel } from "react-icons/md"

import { fetchChats, removeMember, renameGroupChat } from '../../redux/slices/chat/chatApi'

import NewGroupUserCard from '../GroupUserCard/NewGroupUserCard';
import Loadder from '../Loadder';
import { getSender } from '../utils';
import chatContext from '../../context/chatContext';




const PopUpModel = ({ show, handleClose }) => {

    const { selectedChat} = useContext(chatContext)

    const dispatch = useDispatch()
    const { users, loading: userLoadin} = useSelector(state => state.users)
    const { user } = useSelector(state => state.user)
    const {  loading: chatLoading } = useSelector(state => state.chat)




    const [search, setSearch] = useState("")
    const [groupName, setGroupName] = useState("")

    const renameGroup = (e, id, name) => {
        e.preventDefault()
        console.log("ddd")
        dispatch(renameGroupChat({ chatId: id, chatName: name }))
    }

    const handelLeave = (chatId, userId) => {
        setSearch("")
        dispatch(removeMember({ chatId, userId }))
        dispatch(fetchChats())
    }

    const removeGroupMember = (chat, userId) => {

        if (user._id !== chat.groupAdmin._id) {
            toast.warn("Only Admin Can Remove Members", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setSearch("")
            dispatch(removeMember({ chatId: chat._id, userId: userId }))
        }
    }

    useEffect(() => {

        if (search.length > 0) {
            dispatch(getAllUsers(search))
        }

        setGroupName(selectedChat.chatName)
    }, [search, dispatch, selectedChat])
    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedChat.isGroupChat ? "Update Group Chat" : getSender({ chatUsers: selectedChat.users, loggedUser: user }).name}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {selectedChat.isGroupChat ?
                        <>
                            <form className='groupNameUpdate'>
                                <input type='text' placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                                <button onClick={(e) => renameGroup(e, selectedChat._id, groupName)} >Update</button>
                            </form>
                            <form className='groupSearch' >
                                <input type='text' placeholder=' Search Name Or Email' value={search} onChange={(e) => setSearch(e.target.value)} />
                            </form>
                            <div className='groupUsersContainer'>


                                {(selectedChat.users && selectedChat.users[0]) && selectedChat.users.map((User) => {


                                    return <span key={User._id}>

                                        {User.name}

                                        {((user._id === selectedChat.groupAdmin._id) && (User._id !== selectedChat.groupAdmin._id))
                                            && <MdOutlineCancel size={10} onClick={() => removeGroupMember(selectedChat, User._id)} />
                                        }
                                        {
                                            User._id === selectedChat.groupAdmin._id && <> (admin) </>
                                        }
                                    </span>

                                })}
                            </div>
                            {chatLoading && <p><Loadder loading={chatLoading} /></p>}
                            <div className='userContainer' >
                                {userLoadin ? <Skeleton count={6} height={25} /> :
                                    users.map((user, i) => {
                                        return <NewGroupUserCard
                                            user={user} key={i}
                                            selectedChat={selectedChat}
                                            setSearch={setSearch}
                                        />
                                    })
                                }
                            </div>
                        </>

                        :

                        <div className='imageContainer'>
                            <img src={getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url ?
                                getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url :
                                'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'}
                                alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' />
                        </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {selectedChat.isGroupChat ?
                        <>
                            <Button variant="secondary" onClick={() => handleClose()}>
                                Cancel
                            </Button>
                            <Button variant='primary' onClick={() => handelLeave(selectedChat._id, user._id)} >
                                Leave The Group
                            </Button>
                        </>
                        :
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center"

                            }}>

                            {getSender({ chatUsers: selectedChat.users, loggedUser: user }).email}
                        </div>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PopUpModel
