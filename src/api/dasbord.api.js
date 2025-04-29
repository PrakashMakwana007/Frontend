// src/api/dashboard.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const getChannelStats = createAsyncThunk(
  'dashboard/getChannelStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_GET_CHANNEL_STATS_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChannelVideos = createAsyncThunk(
  'dashboard/getChannelVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_GET_CHANNEL_VIDEOS_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);