// src/slices/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getChannelStats, getChannelVideos } from '../api/dasbord.api';

const initialState = {
  stats: {
    totalViews: 0,
    totalSubscribers: 0,
    totalVideos: 0,
    totalLikes: 0,
    graphData: []
  },
  videos: [],
  loading: false,
  error: null,
  lastUpdated: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Action to manually reset dashboard data
    resetDashboard: (state) => {
      state.stats = initialState.stats;
      state.videos = initialState.videos;
      state.lastUpdated = null;
    },
    // Action to update specific stat (for real-time updates)
    updateStat: (state, action) => {
      const { key, value } = action.payload;
      if (state.stats.hasOwnProperty(key)) {
        state.stats[key] = value;
      }
    }
  },
  extraReducers: (builder) => {
    // Get Channel Stats
    builder.addCase(getChannelStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = {
        totalViews: action.payload.totalViews || 0,
        totalSubscribers: action.payload.totalSubscribers || 0,
        totalVideos: action.payload.totalVideos || 0,
        totalLikes: action.payload.totalLikes || 0,
        graphData: action.payload.graphData || []
      };
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(getChannelStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to load channel stats';
    });

    // Get Channel Videos
    builder.addCase(getChannelVideos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(getChannelVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to load channel videos';
    });
  }
});

// Export actions
export const { resetDashboard, updateStat } = dashboardSlice.actions;

// Selectors
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectChannelVideos = (state) => state.dashboard.videos;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectLastUpdated = (state) => state.dashboard.lastUpdated;

// Export reducer
export default dashboardSlice.reducer;