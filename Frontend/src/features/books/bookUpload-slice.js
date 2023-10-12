
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  uploading: false,
  uploadError: null,
  uploadedBook: [], 
};

export const uploadBook = createAsyncThunk(
    'upload/uploadBook', 
    async (formData, { dispatch, getState }) => {
  try {
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.access}`
          }
    }

    const response = await axios.post(
        'http://127.0.0.1:8000/api/new_upload/',
         formData,
         config
      );

    console.log('Book uploaded successfully:', response.data);

    return response.data;

  } catch (error) {
    console.error(error);
    throw error; 
  }
});

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadBook.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })
      .addCase(uploadBook.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadError = null;
        state.uploadedBook = action.payload; 
      })
      .addCase(uploadBook.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
      });
  },
});

export default uploadSlice.reducer;
