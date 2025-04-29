// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoReducer from './videoSlice';
import userReducer from './userSlice';
import likeReducer from './likeSlice';
import subscriptionReducer from './subSLice';
import playlistReducer from './playlistSlice';
import commentReducer from './commentSLice';
import dashboardReducer from './dashbordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    user: userReducer,
    like: likeReducer,
    subscription: subscriptionReducer,
    playlist: playlistReducer,
    comment: commentReducer,
    dashboard: dashboardReducer,
  },
});