// src/api/comment.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const getVideoComments = createAsyncThunk(
  'comment/getVideoComments',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_VIDEO_COMMENTS_URL}/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${import.meta.env.VITE_ADD_COMMENT_URL}/${videoId}`,
        { content }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `${import.meta.env.VITE_UPDATE_COMMENT_URL}/${commentId}`,
        { content }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `${import.meta.env.VITE_DELETE_COMMENT_URL}/${commentId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);