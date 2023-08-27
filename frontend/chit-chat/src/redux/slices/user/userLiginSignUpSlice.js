import { login } from './userApi';
import { register } from './userApi'
import { logOut } from './userApi';
import { loadUser } from './userApi';
const createSlice = require('@reduxjs/toolkit').createSlice;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        loggedIn: false,
        user: {},
        error:null,
        loggedOutMessage:null
    },
    reducers:{
        clearError(state){
            state.error=null
            state.loggedOutMessage=null
        }

    },
    extraReducers: (builder) => {

        //LOGIN
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            state.user = action.payload.userDetails
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.user = {}
            state.error = action.payload.message
          
        })

        // REGISTER
        builder.addCase(register.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            state.user = action.payload.userDetails
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.user = {}
            state.error = action.payload.message
        })

        //logOut
        builder.addCase(logOut.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.loggedOutMessage = action.payload.message
            state.user = {}
            


        })
        builder.addCase(logOut.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = true
            state.loggedOutMessage =null
            state.error = action.payload.message
           
        })

         // loadUer
         builder.addCase(loadUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            // console.log(action.payload.user)
            state.user =action.payload.userDetails

        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.user = {}
            // state.error= action.payload.message
            
        })

        

    }

})


export const { clearError } = userSlice.actions;

export default userSlice.reducer