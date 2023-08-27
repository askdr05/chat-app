import { accessChat, addNewMember, createGroupChat, fetchChats, removeMember, renameGroupChat} from './chatApi';
const createSlice = require('@reduxjs/toolkit').createSlice;

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        singleChat:{},
        chats: [],
        error: null,
        isCreated:false,
        isUpdated:false,
        message:""

    },
    reducers: {
        clearChatError(state) {
            state.error = null

        },
        chatStateReset(state){
            state.isCreated = false
            state.isUpdated = false
        }

    },
    extraReducers: (builder) => {

        //access chat
        builder.addCase(accessChat.pending, (state) => {
            state.loading = true
        })
        builder.addCase(accessChat.fulfilled, (state, action) => {
            let userChat = action.payload.FullChat
            let isExist = state.chats.find((e) => e._id === userChat._id)
            if (isExist) {
                state.chats = [...state.chats]
                // 
            }else{state.chats = [ userChat,...state.chats]}
            state.singleChat= userChat
            state.loading = false
        })
        builder.addCase(accessChat.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })

        //access all chat
        builder.addCase(fetchChats.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.chats = action.payload.allChats
            state.loading = false
        })
        builder.addCase(fetchChats.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })

        //creat group chat
        builder.addCase(createGroupChat.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createGroupChat.fulfilled, (state, action) => {
            state.chats = [...state.chats, action.payload.fullGroupChat]
            state.loading = false
            state.isCreated = true
            state.message = action.payload.message
        })

        builder.addCase(createGroupChat.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })
        //rename group chat
        builder.addCase(renameGroupChat.pending, (state) => {
            state.loading = true
        })
        builder.addCase(renameGroupChat.fulfilled, (state, action) => {
            state.loading = false
            state.singleChat = action.payload.updatedChat
            state.message = action.payload.message
            state.isUpdated = true
        })

        builder.addCase(renameGroupChat.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })
        //add new group member
        builder.addCase(addNewMember.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addNewMember.fulfilled, (state, action) => {
            state.loading = false
            state.singleChat = action.payload.updatedChat
            state.message = action.payload.message
            state.isUpdated = true
        })

        builder.addCase(addNewMember.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })

        //remove group member
        builder.addCase(removeMember.pending, (state) => {
            state.loading = true
        })
        builder.addCase(removeMember.fulfilled, (state, action) => {
            state.loading = false
            state.singleChat = action.payload.updatedChat
            state.message = action.payload.message
            state.isUpdated = true
        })

        builder.addCase(removeMember.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })




    }

})


export const { clearChatError,chatStateReset } = chatSlice.actions;

export default chatSlice.reducer