// src/slices/playlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
 
  deletePlaylist
} from '../api/palylist.api';

const initialState = {
  playlists: [],          // Array of user's playlists
  currentPlaylist: null,  // Currently viewed playlist details
  loading: false,         // Loading state
  error: null,            // Error message
  operationLoading: false // Loading state for operations (add/remove video)
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // Action to clear the current playlist view
    clearCurrentPlaylist: (state) => {
      state.currentPlaylist = null;
    },
    // Action to reset operation loading state
    resetOperationLoading: (state) => {
      state.operationLoading = false;
    }
  },
  extraReducers: (builder) => {
    // Create New Playlist
    builder.addCase(createPlaylist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists.unshift(action.payload);
    });
    builder.addCase(createPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to create playlist';
    });

    // Get User Playlists
    builder.addCase(getUserPlaylists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists = action.payload;
    });
    builder.addCase(getUserPlaylists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch playlists';
    });

    // Get Playlist By ID
    builder.addCase(getPlaylistById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPlaylist = action.payload;
    });
    builder.addCase(getPlaylistById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch playlist';
    });

    // Add Video to Playlist
    builder.addCase(addVideoToPlaylist.pending, (state) => {
      state.operationLoading = true;
      state.error = null;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
      state.operationLoading = false;
      // Update current playlist if this is the one being modified
      if (state.currentPlaylist?._id === action.payload._id) {
        state.currentPlaylist = action.payload;
      }
      // Update in playlists array
      const index = state.playlists.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    });
    builder.addCase(addVideoToPlaylist.rejected, (state, action) => {
      state.operationLoading = false;
      state.error = action.payload?.message || 'Failed to add video to playlist';
    });

    // Remove Video from Playlist
    builder.addCase(removeVideoFromPlaylist.pending, (state) => {
      state.operationLoading = true;
      state.error = null;
    });
    builder.addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
      state.operationLoading = false;
      // Update current playlist if this is the one being modified
      if (state.currentPlaylist?._id === action.payload._id) {
        state.currentPlaylist = action.payload;
      }
      // Update in playlists array
      const index = state.playlists.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    });
    builder.addCase(removeVideoFromPlaylist.rejected, (state, action) => {
      state.operationLoading = false;
      state.error = action.payload?.message || 'Failed to remove video from playlist';
    });

    // Delete Playlist
    builder.addCase(deletePlaylist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePlaylist.fulfilled, (state, action) => {
      state.loading = false;
      // Remove from playlists array
      state.playlists = state.playlists.filter(p => p._id !== action.payload._id);
      // Clear current playlist if it was the deleted one
      if (state.currentPlaylist?._id === action.payload._id) {
        state.currentPlaylist = null;
      }
    });
    builder.addCase(deletePlaylist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to delete playlist';
    });
  }
});

// Export actions
export const { clearCurrentPlaylist, resetOperationLoading } = playlistSlice.actions;

// Export reducer
export default playlistSlice.reducer;