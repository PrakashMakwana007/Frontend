// src/api/subscription.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

export const toggleSubscription = createAsyncThunk(
  'subscription/toggleSubscription',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${import.meta.env.VITE_TOGGLE_SUBSCRIPTION_URL}/${channelId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserSubscriptions = createAsyncThunk(
  'subscription/getUserSubscriptions',
  async (subscriberId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_USER_SUBSCRIPTIONS_URL}/${subscriberId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChannelSubscribers = createAsyncThunk(
  'subscription/getChannelSubscribers',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_GET_CHANNEL_SUBSCRIBERS_URL}/${channelId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);