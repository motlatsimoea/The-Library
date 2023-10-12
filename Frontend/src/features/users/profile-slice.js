import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: [],
    userbooks: [],
    loading: false,
    error: null,
}

export const userprofile = createAsyncThunk(
    'userprofile/profile',
    async (username, { getState }) => {
        try{
            const {
                userLogin: { userInfo },
            } = getState();
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get(
                `/api/users/${username}/`,
                config
            );
            return data
        }catch(error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        }
         
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetUserDetails: (state) => {
            state.user = {};
            state.userbooks = {}
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(userprofile.pending, (state) => {
            state.loading = true;
        })
        .addCase(userprofile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user_profile;
            state.userbooks = action.payload.user_books;
        })
        .addCase(userprofile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { resetUserDetails } = profileSlice.actions;
export default profileSlice.reducer;