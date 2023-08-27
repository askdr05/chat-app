import React, { useEffect, useState } from 'react'
import "./_AllChatsBox.scss"
import { useDispatch, useSelector } from 'react-redux'
import { createGroupChat, fetchChats } from '../../redux/slices/chat/chatApi'
import ChatCard from '../chatCard/ChatCard'
import { BsFillPersonPlusFill } from "react-icons/bs"
import { MdOutlineCancel } from "react-icons/md"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllUsers } from '../../redux/slices/user/userApi'
import {  toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import GroupUserCard from '../GroupUserCard/GroupUserCard'

import { chatStateReset } from '../../redux/slices/chat/chatSlice'


const AllChatsBox = () => {
  const dispatch = useDispatch()
  const { chats, isCreated, message } = useSelector(state => state.chat)
  const { users, loading: userLoadin, } = useSelector(state => state.users)

  const [show, setShow] = useState(false);
  const handleClose = () =>{
    setSearch("")
    setShow(false);
  } 
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState("")
  const [groupName, setGroupName] = useState("")

  const [groupUsers, setGroupUsers] = useState([])

  




  const removeFromGroup = (userId) => {
    let newGroupMembers = groupUsers.filter((user) => user._id !== userId)
    setGroupUsers(newGroupMembers)
  }

  const creatGroup = (users, name) => {

    if (!name && users.length < 0) {
      toast.warn("Group Name Or Group Members Missing", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    } else {
      setGroupName("")
      setGroupUsers([])
      dispatch(createGroupChat({ users, name }))
      handleClose()
    }



  }

  useEffect(() => {
    if (search.length > 0) {
      dispatch(getAllUsers(search))
    }

    if (isCreated) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch(chatStateReset())
    }


  }, [search, dispatch, isCreated, message])


  useEffect(() => {

    dispatch(fetchChats())
  }, [dispatch,isCreated])
  return (
    <div className='allChatsBox' >
      <div className='createGroupChat'>
        <p onClick={handleShow}>
          <button>creat a group</button>
          <BsFillPersonPlusFill size={20} />
        </p>

      </div>
      <div className='chatsContainer'>
        {

        chats && chats.map((chat, i) => {
          return <ChatCard
            chat={chat}
            key={i}
          />
        })
        }
        
      </div>
      <>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <form className='groupSearch' >
              <input type='text' placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              <input type='text' placeholder=' Search Name Or Email' value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
            <div className='groupUsersContainer'>
              {(groupUsers && groupUsers[0]) && groupUsers.map((user, i) => {
                return <span key={i}>{user.name} <MdOutlineCancel size={10} onClick={() => removeFromGroup(user._id)} /> </span>
              })}
            </div>
            <div className='userContainer'>
              {userLoadin ? <Skeleton count={6} height={25} /> :
                users.map((user, i) => {
                  return <GroupUserCard
                    user={user} key={i}
                    setGroupUsers={setGroupUsers}
                    groupUsers={groupUsers}
                  />
                })
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={() => creatGroup(groupUsers, groupName)}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}


export default AllChatsBox
