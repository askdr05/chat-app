import React, { useContext, useEffect } from 'react'
import "./_ChatCard.scss"
import {  useDispatch, useSelector } from 'react-redux'
import { getNumOfUnreadText, getSender } from '../utils'


import chatContext from '../../context/chatContext'
import { accessAllNotifications, removeNotifications } from '../../redux/slices/noficationApi'
import { notificationStateReset } from '../../redux/slices/notificationSlice'


const ChatCard = ({ chat }) => {

const dispatch = useDispatch()

  const { selectedChat, setSelectedChat } = useContext(chatContext)

  const { user } = useSelector(state => state.user)
  const {allNotifications,isRemoved} = useSelector(state => state.notification)

  const handelOnclick = (chat) => {
    setSelectedChat(chat)
    dispatch(removeNotifications( chat._id))
  }

  useEffect(()=>{
  if(isRemoved){
    dispatch(accessAllNotifications())
    dispatch(notificationStateReset())
  }
  },[dispatch,isRemoved])

  return (
    <div onClick={() => handelOnclick(chat)} className={selectedChat._id === chat._id ? "ActiveUserCard" : "UserCard" }>
      <img 
      src={getSender({loggedUser:user,chatUsers:chat.users}).avatar.url ? getSender({loggedUser:user,chatUsers:chat.users}).avatar.url
      :'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'
      
      } 
      alt= 'https://cdn-icons-png.flaticon.com/512/3106/3106773.png' />
      <p>
        <span className='Name'> {chat.isGroupChat ? chat.chatName : getSender({loggedUser:user,chatUsers:chat.users}).name}</span>
        {chat.latestMessage && <span className='latestMessage'>{chat.latestMessage.sender._id === user._id ? "me" : chat.latestMessage.sender.name} : {chat.latestMessage.content.length > 20 ? chat.latestMessage.content.slice(0,20)+"...":chat.latestMessage.content}</span>}
      </p>
      {allNotifications.find((e) => e.chat === chat._id) && <span
      className='unreadText'
        

      >{getNumOfUnreadText(allNotifications, chat)}</span>}
    </div>
  )
}

export default ChatCard
