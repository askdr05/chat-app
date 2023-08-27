import { request } from "../../baseApi";
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
// import io from "socket.io-client"
// const ENDPOINT = "http://localhost:3000"
// let socket
//access all the masseges of a single chat
export const fetchMasseges = createAsyncThunk('masseges/chatMasseges',async(chatId, { rejectWithValue })=>{
    try {
        // console.log(chatId)
        const {data} = await request.get(`/messages/${chatId}`)
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
//access all the masseges of a single chat
export const sendMessage = createAsyncThunk('masseges/sendMessage',async(message, { rejectWithValue })=>{
    try {


        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.post(`/newMessage`,message,config)
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