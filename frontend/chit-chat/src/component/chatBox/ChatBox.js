import React, { useContext, useEffect, useState } from 'react'
import "./_ChatBox.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getSender } from '../utils'
import PopUpModel from '../popUpModel/PopUpModel'
import { chatStateReset } from '../../redux/slices/chat/chatSlice'
import {  toast } from 'react-toastify';
import MessagesContainer from './MessagesContainer'
import { IoMdArrowRoundBack, IoIosSend } from "react-icons/io"
import { PiDotsThreeVerticalBold } from "react-icons/pi"

import { sendMessage } from '../../redux/slices/message/messageApi'
import { addNewRecivedMessage, messageStateReset } from '../../redux/slices/message/messageSlice'
import Avatar from 'react-avatar';
import io from "socket.io-client"

import { fetchChats } from '../../redux/slices/chat/chatApi'
import chatContext from '../../context/chatContext'
import { sendNotifications } from '../../redux/slices/noficationApi'
const ENDPOINT = "http://localhost:3000"
let socket


const ChatBox = () => {

  const { selectedChat, setSelectedChat } = useContext(chatContext)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { singleChat, isUpdated, message } = useSelector(state => state.chat)
  const { singleMessage } = useSelector((state) => state.message)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [socketConnected, setSocketConnected] = useState(false)

  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);


  const [newMessage, setNewMessage] = useState("")


  const handelSendMessage = (e) => {
    e.preventDefault()
    setNewMessage("")
    dispatch(sendMessage({ chatId: selectedChat._id, content: newMessage }))
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    console.log(e.target.value)
    console.log(socketConnected)
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", user._id)

    socket.on("connected", () => {
      console.log("connected")
      setSocketConnected(true)})

    socket.on("isTyping", () => setIsTyping(true))
    socket.on("stop isTyping", () => setIsTyping(false));

    

  }, [])

  


  useEffect(() => {

    if (selectedChat._id) {
      socket.emit("join chat", selectedChat._id)
    }
  }, [selectedChat])

  useEffect(() => {

    if (singleMessage.content) {
      socket.emit("new message", singleMessage)
      dispatch(messageStateReset())
      dispatch(fetchChats())
    }

  }, [dispatch, singleMessage])


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {

      setIsTyping(false)

      if (
        !selectedChat._id || // if chat is not selected or doesn't match current chat
        selectedChat._id !== newMessageRecieved.chat._id
      ) {

        dispatch(sendNotifications({messageId:newMessageRecieved._id,chatId: newMessageRecieved.chat._id}))
        dispatch(fetchChats())

      } else {

       dispatch(addNewRecivedMessage(newMessageRecieved));

      }
    });
    return () => {
      socket.off();
    }
  }, [dispatch, selectedChat]);

  useEffect(() => {
    if (isUpdated) {

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
      let isExist = singleChat.users.find((User) => user._id === User._id)
      if (isExist) {

        setSelectedChat(singleChat)

      } else { setSelectedChat({}) }

      dispatch(chatStateReset())
    }
  }, [singleChat, dispatch, isUpdated, message, setSelectedChat, user])
  return (
    <div className={selectedChat && selectedChat._id ? 'activeChatbox' : "chatbox"}>
      {selectedChat && selectedChat._id ?
        <>
          <div className='chatBoxHeader'>
            <p>
              <span className='backIcon' onClick={() => setSelectedChat({})}>
                <IoMdArrowRoundBack size={23} />
              </span>
              <span>
                {selectedChat.isGroupChat ? selectedChat.chatName : user._id === selectedChat.users[0]._id ? selectedChat.users[1].name : selectedChat.users[0].name}
              </span>
              
            </p>
            {selectedChat.isGroupChat ?

              <span onClick={() => handleShow()}>
                <PiDotsThreeVerticalBold size={23} />
              </span>
              :
              <Avatar
                size='35'
                round={true}
                src={getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url ?
                  getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url :
                  'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'}
                onClick={() => handleShow()}
              />

            }
          </div>
          <div className='chatBoxMainContainer'>

            <MessagesContainer typing={istyping} />

            <form onSubmit={handelSendMessage}>

              <textarea value={newMessage} placeholder='Message' onChange={typingHandler} >
               
              </textarea>
              <button disabled={!newMessage && true} >
                <IoIosSend size={23} />
              </button>
            </form>
          </div>
          {/*  */}
          <PopUpModel
            show={show}
            handleClose={handleClose}

          />
        </>
        : <span>Click On The Chat To See The Masseges</span>}
    </div>
  )
}

export default ChatBox
