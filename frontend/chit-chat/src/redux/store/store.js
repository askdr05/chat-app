import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/user/userLiginSignUpSlice"
import chatReducer from "../slices/chat/chatSlice"
import userPasswordResetReducer from "../slices/user/passwordResetSlice"
 import usersReducer from "../slices/user/UsersSlice"
 import messageReducer from "../slices/message/messageSlice"
 import notificationReducer from "../slices/notificationSlice"
 import userUpdateReducer from "../slices/user/userUpdateSlice"
export const store = configureStore({
    reducer: {

        user: userReducer,
        userPasswordReset: userPasswordResetReducer,
        updatedUser:userUpdateReducer,
        users:usersReducer,
        chat:chatReducer,
        message:messageReducer,
        notification:notificationReducer

    }
}) 