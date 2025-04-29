// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  getCurrentUser, 
  updateAvatar, 
  updateCoverImage, 
  getChannelProfile,
  getWatchHistory
} from '../api/user.api';

const initialState = {
  currentUser: null,
  channelProfile: null,
  watchHistory: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update Avatar
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload.avatar;
      }
    });

    // Update Cover Image
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      if (state.currentUser) {
        state.currentUser.coverImage = action.payload.coverImage;
      }
    });

    // Get Channel Profile
    builder.addCase(getChannelProfile.fulfilled, (state, action) => {
      state.channelProfile = action.payload;
    });

    // Get Watch History
    builder.addCase(getWatchHistory.fulfilled, (state, action) => {
      state.watchHistory = action.payload;
    });
  },
});

export default userSlice.reducer;