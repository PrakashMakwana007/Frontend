// src/api/auth.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
       const response = await API.post(
        import.meta.env.VITE_REGISTER_URL,
        userData
       )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post(
        import.meta.env.VITE_LOGIN_URL,
        credentials
      );
      console.log('Login response:', response.data); // Log the response data
      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken); 
        localStorage.setItem('refreshToken', refreshToken); 
      }

      console.log("access and resresh ",accessToken,refreshToken)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post(import.meta.env.VITE_LOGOUT_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await API.post(
        import.meta.env.VITE_REFRESH_TOKEN_URL,
        { refreshToken }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await API.post(
        import.meta.env.VITE_CHANGE_PASSWORD_URL,
        passwords
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);