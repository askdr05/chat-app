import { request } from "../../baseApi";
// import axios from 'axios'

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk

//access chat
export const accessChat = createAsyncThunk('chat/userChat',async(userId, { rejectWithValue })=>{
    try {
    
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.post(`/`,{userId},config)
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
//access all chats
export const fetchChats = createAsyncThunk('chat/userChats',async(userDetails, { rejectWithValue })=>{
    try {
        const {data} = await request.get(`/`)
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
//creat group chat
export const createGroupChat = createAsyncThunk('chat/createGoupChat',async(GroupDetails, { rejectWithValue })=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.post(`/group`,GroupDetails,config)
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
//rename group chat
export const renameGroupChat = createAsyncThunk('chat/renameGoupChat',async(GroupDetails, { rejectWithValue })=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.put(`/group/rename`,GroupDetails,config)
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

//add new group member
export const addNewMember = createAsyncThunk('chat/addNewMember',async(GroupDetails, { rejectWithValue })=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.put("/groupadd",GroupDetails,config)
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
//remove group member
export const removeMember = createAsyncThunk('chat/removeMember',async(GroupDetails, { rejectWithValue })=>{
    try {
        // console.log(GroupDetails)
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.put("/groupremove",GroupDetails,config)
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