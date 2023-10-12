import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userInfo: {},
    loading: false,
    error: null,
};

export const register = createAsyncThunk(
    'register/register_user',
    async ({ username, email, password }, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
    
            const { data } = await axios.post(
                '/api/users/register/',
                { 'username': username, 'email': email, 'password': password },
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data
        } catch (error){
            return rejectWithValue(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message);
        }
        

});

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default registerSlice.reducer;