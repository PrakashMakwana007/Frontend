// slices/videoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  getAllVideos, 
  publishVideo, 
  getVideoById, 
  updateVideo, 
  deleteVideo,
  togglePublishStatus 
} from '../api/video.api';

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Videos
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    });
    builder.addCase(getAllVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get Video By ID
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    });
    builder.addCase(getVideoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Publish Video
    builder.addCase(publishVideo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(publishVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.unshift(action.payload);
    });
    builder.addCase(publishVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update Video
    builder.addCase(updateVideo.fulfilled, (state, action) => {
      const index = state.videos.findIndex(v => v._id === action.payload._id);
      if (index !== -1) {
        state.videos[index] = action.payload;
      }
      if (state.currentVideo?._id === action.payload._id) {
        state.currentVideo = action.payload;
      }
    });

    // Delete Video
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.videos = state.videos.filter(v => v._id !== action.payload._id);
    });

    // Toggle Publish Status
    builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
      const index = state.videos.findIndex(v => v._id === action.payload._id);
      if (index !== -1) {
        state.videos[index].isPublished = action.payload.isPublished;
      }
      if (state.currentVideo?._id === action.payload._id) {
        state.currentVideo.isPublished = action.payload.isPublished;
      }
    });
  },
});

export default videoSlice.reducer;