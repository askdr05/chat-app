import React from 'react'

const GroupUserCard = ({user,groupUsers,setGroupUsers}) => {

const handelOnClock = (User)=>{
    const isExist = groupUsers.find((user)=>user._id === User._id)
    if(!isExist){
        let newGroupUsers = [...groupUsers,User]
        setGroupUsers(newGroupUsers)
    }else{return}
}
    
    return (
        <div className='UserCard' onClick={()=>handelOnClock(user)} >
            <img src={user.avatar.url ? user.avatar.url
                :'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'} 
                alt='https://cdn-icons-png.flaticon.com/512/3106/3106773.png' />
            <p>
                <span className='Name'>Name: {user.name}</span>
                <span className="Email" >Email: {user.email}</span>
            </p>
        </div>
    )
}

export default GroupUserCard
