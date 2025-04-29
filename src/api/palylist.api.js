// src/api/playlist.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (playlistData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        import.meta.env.VITE_CREATE_PLAYLIST_URL,
        playlistData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserPlaylists = createAsyncThunk(
  'playlist/getUserPlaylists',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_USER_PLAYLISTS_URL}/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  'playlist/getPlaylistById',
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_PLAYLIST_BY_ID_URL}/${playlistId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  'playlist/addVideoToPlaylist',
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `${import.meta.env.VITE_ADD_VIDEO_TO_PLAYLIST_URL}/${videoId}/${playlistId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeVideoFromPlaylist = createAsyncThunk(
  'playlist/removeVideoFromPlaylist',
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `${import.meta.env.VITE_REMOVE_VIDEO_FROM_PLAYLIST_URL}/${videoId}/${playlistId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  'playlist/deletePlaylist',
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `${import.meta.env.VITE_DELETE_PLAYLIST_URL}/${playlistId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);