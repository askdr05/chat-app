import { getAllUsers, userRollUpdate, adminDeleteUsers, getUserDetails } from './userApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users: [],
        error: null,
        
    },
    reducers: {
        clearUsersSliceError(state) {
            state.error = null
        }

    },
    extraReducers: (builder) => {

        //users
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.users

        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.users = {}
            state.error = action.payload.message

        })

       
    }

})


export const { clearUsersSliceError } = usersSlice.actions;

export default usersSlice.reducer