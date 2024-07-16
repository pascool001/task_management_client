import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:4000/api/auth';

const initialState = {
    connectedUser: null,
    isAuthenticated: false,
    token: null,
    status: 'idle', //'idle' | 'loading' | 'success' | 'failed'?
    IsOk: false,
    message: null
}

export const authenticate = createAsyncThunk('auth/login', async (payload) => {
    const {data} = await axios.post(`${URL}/login`, payload);
    console.log('authData : ', data)
    return data
})

export const register = createAsyncThunk('auth/register',  async (payload) => {
    const {data} = await axios.post(`${URL}/register`, payload);
    return data
})

export const activate = createAsyncThunk('auth/activation', async (payload) => {
    const {data} = await axios.post(`${URL}/activation`, payload);
    return data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStatusToIdle: (state) => {
            state.status = 'idle'
        },
        initState: (state) => {
            state.connectedUser = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.message = null;
            state.IsOk=false;
            state.token = null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(authenticate.pending, (state) => { state.status = 'loading' })
        .addCase(authenticate.fulfilled, (state, action) => {
            const {data: {user, accessToken}} = action.payload;
            state.status = 'success';
            state.connectedUser = user;
            state.token = accessToken;
            state.isAuthenticated = true;
            state.message = null
        })
        .addCase(authenticate.rejected, (state) => {
            state.status = 'failed';
            state.connectedUser = null;
            state.token = null;
            state.isAuthenticated = false;
            state.message = 'Email ou password invalide'
        })
        .addCase(register.pending, (state) => { state.status = 'loading' })
        
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'success';
            state.message =  action.payload.message //'Processus de création de compte initié avec success. '
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.message = action.error.message
        })
        .addCase(activate.pending, (state) => { state.status = 'loading' })
        .addCase(activate.fulfilled, (state, action) => {
            state.status = 'success';
            state.connectedUser = null;
            state.token = null;
            state.isAuthenticated = false;
            state.IsOk= action.payload.isOk
            state.message = action.payload.message
        })

        .addCase(activate.rejected, (state, action) => {
            state.status = 'failed';
            state.connectedUser = null;
            state.token = null;
            state.isAuthenticated = false;
            state.IsOk=false
            state.message = action.payload.message
        })
 
    } 
})
        


export const isAuthenticated = (state) => state.authReducer.isAuthenticated;
export const connectedUser = (state) => state.authReducer.connectedUser;
export const token = (state) => state.authReducer.token;
export const getState = (state) => state.authReducer;


export const { setStatusToIdle, initState } = authSlice.actions
export default authSlice.reducer
