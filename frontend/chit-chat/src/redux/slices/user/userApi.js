import { request } from "../../baseApi";
// import axios from 'axios'

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk


//login
export const login = createAsyncThunk('user/userLogin',async(loginDetails, { rejectWithValue })=>{
    try {
        const {loginEmail,loginPassword} = loginDetails
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await request.post(`/login`,{email:loginEmail,password:loginPassword},config)
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



// register user
export const register = createAsyncThunk('user/userRegister',async(registerDetails, { rejectWithValue })=>{
    try {
        console.log(registerDetails)
        const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        const {data} = await request.post(`/register`,registerDetails,config)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//loading user
export const loadUser = createAsyncThunk('User/userLoad',async(demo, { rejectWithValue })=>{
    try {
        const {data} = await request.get(`/me`)
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
// logout
export const logOut = createAsyncThunk('user/userLogOut',async(demo, { rejectWithValue })=>{
    try {
        const {data} = await request.get(`/logout`)
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
// userUpdate
export const userUpdate = createAsyncThunk('user/userUpdate',async(userDetails, { rejectWithValue })=>{
    // const{updatedEmail,updatedName} = userDetails
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try {
        const {data} = await request.put("/me/update",userDetails,config)
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

//password update
export const userPasswordUpdate = createAsyncThunk('user/userPasswordUpdate',async(userDetails, { rejectWithValue })=>{
    // const{updatedEmail,updatedName} = userDetails
    const config = { headers: { "Content-Type": "application/json"} };
    try {
        const {data} = await request.put("/me/update/password",userDetails,config)
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

//forgot password

export const userForgotPassword = createAsyncThunk('user/userForgotPassword',async(userDetails, { rejectWithValue })=>{
    // const{updatedEmail,updatedName} = userDetails
    const config = { headers: { "Content-Type": "application/json"} };
    try {
        const {data} = await request.post("/password/forget",userDetails,config)
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
//reset password

export const userPasswordReset = createAsyncThunk('user/userPasswordReset',async(userDetails, { rejectWithValue })=>{
    // const{updatedEmail,updatedName} = userDetails
    const config = { headers: { "Content-Type": "application/json"} };
    try {
        const {data} = await request.put(`/password/reset/${userDetails.token}`,userDetails.myForm,config)
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


//all users
export const getAllUsers = createAsyncThunk('User/getAllUsers',async(search, { rejectWithValue })=>{
    try {
        console.log(search)
        const {data} = await request.get(`/users?search=${search}`)
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
