// src/api/video.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const getAllVideos = createAsyncThunk(
  'video/getAllVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(import.meta.env.VITE_GET_ALL_VIDEOS_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const publishVideo = createAsyncThunk(
  'video/publishVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('videoFile', videoData.videoFile);
      formData.append('thumbnail', videoData.thumbnail);
      formData.append('title', videoData.title);
      formData.append('description', videoData.description);
      
      const response = await API.post(
        import.meta.env.VITE_PUBLISH_VIDEO_URL,
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

export const getVideoById = createAsyncThunk(
  'video/getVideoById',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_VIDEO_BY_ID_URL}/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateVideo = createAsyncThunk(
  'video/updateVideo',
  async ({ videoId, videoData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (videoData.thumbnail) formData.append('thumbnail', videoData.thumbnail);
      if (videoData.title) formData.append('title', videoData.title);
      if (videoData.description) formData.append('description', videoData.description);
      
      const response = await API.patch(
        `${import.meta.env.VITE_UPDATE_VIDEO_URL}/${videoId}`,
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

export const deleteVideo = createAsyncThunk(
  'video/deleteVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `${import.meta.env.VITE_DELETE_VIDEO_URL}/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  'video/togglePublishStatus',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `${import.meta.env.VITE_TOGGLE_PUBLISH_STATUS_URL}/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);