  // commentSlice.js
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios'

  const initialState = {
          success: false,
          loading: false,
          error: null,
      }

  export const createComment = createAsyncThunk(
    'comments/createComment',
    async (commentData, { rejectWithValue, getState }) => {
      try {
          const {
              userLogin: { userInfo },
          } = getState()

          const config = {
              headers: {
                  'Content-type': 'application/json',
                  Authorization: `Bearer ${userInfo.access}`
              }
          }
          console.log(commentData);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/book/${commentData.book}/`,
          commentData,
          config
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
          comment_reset: (state) => {
              state.success = false;
              state.error = null;
              state.loading = false;
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createComment.pending, (state) => {
              state.loading = true;
        })
        .addCase(createComment.fulfilled, (state) => {
              state.loading = false;
              state.success = true;

        })
        .addCase(createComment.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
        });
    },
  });

  export const { comment_reset } = commentSlice.actions;
  export default commentSlice.reducer;
