// slices/likeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toggleVideoLike, toggleCommentLike, getLikedVideos } from '../api/like.api';

const initialState = {
  likedVideos: [],
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Toggle Video Like
    builder.addCase(toggleVideoLike.fulfilled, (state, action) => {
      // Update video like status in state if needed
    });

    // Toggle Comment Like
    builder.addCase(toggleCommentLike.fulfilled, (state, action) => {
      // Update comment like status in state if needed
    });

    // Get Liked Videos
    builder.addCase(getLikedVideos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLikedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload;
    });
    builder.addCase(getLikedVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default likeSlice.reducer;