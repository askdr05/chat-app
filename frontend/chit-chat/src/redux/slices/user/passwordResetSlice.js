import { userForgotPassword, userPasswordReset } from "./userApi";

const createSlice = require('@reduxjs/toolkit').createSlice;

const userPasswordResetSlice = createSlice({
    name: "userPasswordReset",
    initialState: {
        loading: false,
        success: false,
        message: null,
        error: null
    },
    reducers: {
        clearError(state) {
            state.error = null

        },

        resetState(state) {

            state.success = false
            state.message = null

        }
    },
    extraReducers: (builder) => {

        //user password forgot
        builder.addCase(userForgotPassword.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userForgotPassword.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.message = action.payload.message
        })
        builder.addCase(userForgotPassword.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.message = null
            state.error = action.payload.message

        })
        //user password reset
        builder.addCase(userPasswordReset.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userPasswordReset.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
        })
        builder.addCase(userPasswordReset.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.message = null
            state.error = action.payload.message

        })


    }
})

export const { clearError, resetState } = userPasswordResetSlice.actions;

export default userPasswordResetSlice.reducer