

export const getSender = (users) => {

    if (users.loggedUser._id === users.chatUsers[0]._id) {
        return users.chatUsers[1]
    } else { return users.chatUsers[0] }

}

export const getNumOfUnreadText = (allNotifications,chat)=>{
        let total = 0
        allNotifications.forEach((e)=>{
            if(e.chat === chat._id){

                total = total+1
            }
        })
        return total
}

export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
