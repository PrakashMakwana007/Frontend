// src/api/user.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_GET_CURRENT_USER_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (avatarFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      const response = await API.post(
        import.meta.env.VITE_UPDATE_AVATAR_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  'user/updateCoverImage',
  async (coverImageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', coverImageFile);
      const response = await API.post(
        import.meta.env.VITE_UPDATE_COVER_IMAGE_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChannelProfile = createAsyncThunk(
  'user/getChannelProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await API.post(
        import.meta.env.VITE_CHANNEL_PROFILE_URL,
        { username }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getWatchHistory = createAsyncThunk(
  'user/getWatchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_WATCH_HISTORY_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);