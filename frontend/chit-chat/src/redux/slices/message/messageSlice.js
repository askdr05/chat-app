import { sendMessage, fetchMasseges } from './messageApi';
const createSlice = require('@reduxjs/toolkit').createSlice;

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        sendLoading: false,
        singleMessage: {},
        messages: [],
        error: null,

    },
    reducers: {
        clearMessageError(state) {
            state.error = null

        },
        messageStateReset(state){
            state.singleMessage = {}
            
        },
        addNewRecivedMessage(state,action){
            state.messages.push(action.payload)
            // console.log(action.payload)
        }

    },
    extraReducers: (builder) => {

        //send message
        builder.addCase(sendMessage.pending, (state) => {
            state.sendLoading = true
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.sendLoading = false
            let message = action.payload.message
            state.singleMessage = message
            state.messages = [...state.messages, message]
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.sendLoading = false
            state.error = action.payload.message

        })

        //access all messages of a chat
        builder.addCase(fetchMasseges.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMasseges.fulfilled, (state, action) => {
            state.messages = action.payload.messages
            state.loading = false
        })
        builder.addCase(fetchMasseges.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })


    }

})


export const { clearMessageError ,messageStateReset,addNewRecivedMessage} = messageSlice.actions;

export default messageSlice.reducer