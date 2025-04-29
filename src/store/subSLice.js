// slices/subscriptionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  toggleSubscription, 
  getUserSubscriptions, 
  getChannelSubscribers 
} from '../api/sunscrib.api';

const initialState = {
  subscriptions: [],
  subscribers: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Toggle Subscription
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      const { channelId, isSubscribed } = action.payload;
      if (isSubscribed) {
        state.subscriptions.push(channelId);
      } else {
        state.subscriptions = state.subscriptions.filter(id => id !== channelId);
      }
    });

    // Get User Subscriptions
    builder.addCase(getUserSubscriptions.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
    });

    // Get Channel Subscribers
    builder.addCase(getChannelSubscribers.fulfilled, (state, action) => {
      state.subscribers = action.payload;
    });
  },
});

export default subscriptionSlice.reducer;