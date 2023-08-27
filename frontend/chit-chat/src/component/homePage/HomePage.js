import React, { useEffect, useState } from 'react'
import "./_HomePage.scss"
import Header from '../header/Header'
import AllChatsBox from '../allChats/AllChatsBox'
import ChatBox from '../chatBox/ChatBox'
import SideBar from '../sideBar/SideBar'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { clearChatError } from '../../redux/slices/chat/chatSlice'
import { clearMessageError } from '../../redux/slices/message/messageSlice'
import Title from '../Title'

const HomePage = () => {
    const dispatch = useDispatch()
    const { error: chatError } = useSelector(state => state.chat)
    const { error: userError } = useSelector(state => state.users)
    const { error: messageError } = useSelector(state => state.message)

    const errorToast = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    const [toggleValue, setToggleValue] = useState(false)

    const handelSidebar = () => {
        setToggleValue((value) => !value)

    }
    useEffect(() => {

        if (chatError) {
            toast.error(chatError,errorToast);
            dispatch(clearChatError())
        }
        if(messageError){
            toast.error(messageError,errorToast);
            dispatch(clearMessageError())
        }
        
    }, [chatError, userError, messageError,dispatch])
    return (
      <>
      <Title title="Home"/>
        <div className='homePage' >
            <Header handelSidebar={handelSidebar} />
            <SideBar setToggleValue={setToggleValue}  toggleValue={toggleValue} />
            <div className='homePageContainer'>
                <AllChatsBox  />
                <ChatBox  />
            </div>

        </div>
      </>
    )
}

export default HomePage
