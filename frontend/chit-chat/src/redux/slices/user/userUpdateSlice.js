import { userUpdate,userPasswordUpdate } from './userApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const userUpdateSlice = createSlice({
    name: 'updatedUser',
    initialState: {
        loading: false,
        isUpdated: false,
        error: null,
    },
    reducers: {
        clearError(state) {
            state.error = null

        },

        reSetState(state) {

            state.isUpdated = false
            
        }

    },

    extraReducers: (builder) => {

        //updating user
        builder.addCase(userUpdate.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userUpdate.fulfilled, (state, action) => {
            state.loading = false

            state.isUpdated = action.payload.success
        })
        builder.addCase(userUpdate.rejected, (state, action) => {
            state.loading = false
            state.isUpdated = false
            state.error = action.payload.message

        })

        //password update

        builder.addCase(userPasswordUpdate.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userPasswordUpdate.fulfilled, (state, action) => {
            state.loading = false

            state.isUpdated = action.payload.success
        })
        builder.addCase(userPasswordUpdate.rejected, (state, action) => {
            state.loading = false
            state.isUpdated = false
            state.error = action.payload.message

        })



    }

})


export const { clearError,reSetState } = userUpdateSlice.actions;

export default userUpdateSlice.reducer