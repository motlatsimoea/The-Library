import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    books: [],
    loading: false,
    error: null,
}

export const fetchbookList = createAsyncThunk(
    'bookList/books',
    async (_, { rejectWithValue, getState }) => {
        try{
            const response = await axios.get('/api/books/')
            
            return response.data

            

        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
            );

        }   
});

const bookSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchbookList.pending, (state) => {
                state.loading = true;
                state.books = [];
            })
            .addCase(fetchbookList.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchbookList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            });
    },
});

export default bookSlice.reducer