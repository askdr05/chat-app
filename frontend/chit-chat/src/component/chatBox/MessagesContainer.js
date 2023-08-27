import React, { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMasseges } from '../../redux/slices/message/messageApi'
import ScrollableFeed from "react-scrollable-feed";
import "./_MessagesContainer.scss"
import PulseLoader from "react-spinners/PulseLoader";
import Avatar from 'react-avatar';
import { getSender, isLastMessage, isSameSender } from '../utils';

import Loadder from '../Loadder';
import chatContext from '../../context/chatContext';
import { removeNotifications } from '../../redux/slices/noficationApi';


const MessagesContainer = ({ typing }) => {

   const { selectedChat} = useContext(chatContext)
    const dispatch = useDispatch()

    const { messages, loading } = useSelector((state) => state.message)
    const { user } = useSelector((state) => state.user)




    useEffect(() => {

        dispatch(fetchMasseges(selectedChat._id))
       
    }, [dispatch, selectedChat])

    // useEffect(() => {
    //     console.log(typing)
   
    // }, [typing])

    return (

        <>
            {loading ? <div className='lodderDiv'><Loadder loading={loading} /></div> :
                <div className='MessagesContainer'>
                    <ScrollableFeed className='textContainer'>

                        {(messages && messages[0]) &&
                            messages.map((message, i) => {
                                return <div key={i} className='text'>
                                    {(isSameSender(messages, message, i, user._id) || isLastMessage(messages, i, user._id)) &&
                                        <Avatar
                                            size='22'
                                            round={true}
                                            src={getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url ?
                                            getSender({ chatUsers: selectedChat.users, loggedUser: user }).avatar.url :  'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'
                                           }
                                        />
                                    }
                                    <div className={(message.sender._id === user._id) ? "userText" : "senderText"}
                                     style={{ marginLeft: (isSameSender(messages, message, i, user._id) || isLastMessage(messages, i, user._id)) && "0" }}
                                    >
                                       
                                        <p className='content'>
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            })
                        }
                        {typing &&
                            <div>
                                <PulseLoader
                                    
                                    color="#36d7b7"
                                    loading={typing}
                                    
                                    size={10}
                                
                                />
                                {/* ... */}
                            </div>}
                    </ScrollableFeed>




                </div>}
        </>




    )
}

export default MessagesContainer
