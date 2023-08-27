import React from 'react'
import "./_UserCard.scss"
import { accessChat, fetchChats } from '../../redux/slices/chat/chatApi'
import { useDispatch } from 'react-redux'
const UserCard = ({ setToggleValue, user }) => {
  const dispatch = useDispatch()

  const handelOnclick = () => {
    dispatch(accessChat(user._id))
    setToggleValue(false)
    dispatch(fetchChats())

  }

  return (
    <div className='UserCard' onClick={() => handelOnclick()}>
      <img src='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' />
      <p>
        <span className='Name'>Name: {user.name}</span>
        <span className='Email'>Email: {user.email}</span>
      </p>
    </div>
  )
}

export default UserCard
