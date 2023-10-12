import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  updating: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (updatedProfileData, { getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(
        '/api/users/profile',
        updatedProfileData,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);

const editProfileSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default editProfileSlice.reducer;