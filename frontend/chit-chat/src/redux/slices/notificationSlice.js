import { accessAllNotifications, sendNotifications, removeNotifications } from './noficationApi';
// {
//      localStorage.getItem("unReadChats") ?
//         JSON.parse(localStorage.getItem("unReadChats")) : 
// localStorage.getItem("unReadMessages") ?
//             JSON.parse(localStorage.getItem("unReadMessages")) :

const createSlice = require('@reduxjs/toolkit').createSlice;

const notificationSlice = createSlice({
    name: 'notification',
    initialState:{
        loading: false,
        allNotifications: [],
        // singleNotification : {},
        isRemoved : false,
        error:""

},
    reducers: {
        notificationStateReset(state){
            state.isRemoved= false
        }

},

extraReducers: (builder) => {

    //access all Notifications
    builder.addCase(accessAllNotifications.pending, (state) => {
        state.loading = true
    })
    builder.addCase(accessAllNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.allNotifications = action.payload.allNotifications
    })
    builder.addCase(accessAllNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })

    //send Notification
    builder.addCase(sendNotifications.pending, (state) => {
        state.loading = true
    })
    builder.addCase(sendNotifications.fulfilled, (state, action) => {
        let singleNotification = action.payload.newNotification
        state.loading = false
        state.allNotifications.push(singleNotification)
    })
    builder.addCase(sendNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })
    //remove Notification
    builder.addCase(removeNotifications.pending, (state) => {
        state.loading = true
    })
    builder.addCase(removeNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.isRemoved = true
       
    })
    builder.addCase(removeNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })


}

})



export const { notificationStateReset } = notificationSlice.actions;
export default notificationSlice.reducer