import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewMember } from '../../redux/slices/chat/chatApi';
import chatContext from '../../context/chatContext';

const NewGroupUserCard = ({user,setSearch}) => {
    const {selectedChat}= useContext(chatContext)

    const dispatch = useDispatch()
    
    const handelOnClock = (User)=>{
        const isExist = selectedChat.users.find((user)=>user._id === User._id)
        if(!isExist){
            setSearch("")
           dispatch(addNewMember({chatId:selectedChat._id,userId:user._id}))
        }else{
            toast.warning("User Already Exist", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
  return (
    <div className='UserCard' onClick={()=>handelOnClock(user)} >
    <img src={user.avatar.url ? user.avatar.url:
        'https://cdn-icons-png.flaticon.com/512/3106/3106773.png' }
        alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' />
    <p>
        <span className='Name'>Name: {user.name}</span>
        <span className='Email'>Email: {user.email}</span>
    </p>
</div>
  )
}

export default NewGroupUserCard
