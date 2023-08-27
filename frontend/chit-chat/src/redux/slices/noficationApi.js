import { request } from "../baseApi";
// import axios from 'axios'

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk

//access Notifications
export const accessAllNotifications = createAsyncThunk('notification/userNotifications',async(_ , { rejectWithValue })=>{
    try {
    
        // const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.get(`/notifications`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})
//send Notifications
export const sendNotifications = createAsyncThunk('notification/sendNotifications',async(notification, { rejectWithValue })=>{
    try {
     console.log(notification)
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.post(`/notifications`,notification,config)
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})
//remove Notifications
export const removeNotifications = createAsyncThunk('notification/removeNotifications',async(chatId, { rejectWithValue })=>{
    try {
        console.log(chatId)
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.delete(`/notifications/${chatId}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})
