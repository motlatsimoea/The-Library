import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    book: { comments:[] },
    loading: false,
    error: null,
}

export const fetchBook = createAsyncThunk(
    'book/fetchBook',
    async (id, { rejectWithValue, getState }) => {
        try{
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const response = await axios.get(
                `/api/books/${id}/`,
                config
                )
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
            );

        }   
});

const bookDetailsSlice = createSlice({
    name: 'bookDetails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                state.book = action.payload;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            });
    },
});

export default bookDetailsSlice.reducer