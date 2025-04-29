// src/api/like.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const toggleVideoLike = createAsyncThunk(
  'like/toggleVideoLike',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${import.meta.env.VITE_TOGGLE_VIDEO_LIKE_URL}/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  'like/toggleCommentLike',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${import.meta.env.VITE_TOGGLE_COMMENT_LIKE_URL}/${commentId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLikedVideos = createAsyncThunk(
  'like/getLikedVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_GET_LIKED_VIDEOS_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);