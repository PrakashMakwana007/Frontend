// src/slices/commentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment
} from '../api/comment.api';

const initialState = {
  comments: [],       // Array to store comments for current video
  loading: false,     // Loading state
  error: null,        // Error message
  editingCommentId: null,  // Currently being edited comment ID
  replyToCommentId: null   // Comment ID being replied to
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    // Action to set which comment is being edited
    setEditingComment: (state, action) => {
      state.editingCommentId = action.payload;
    },
    // Action to set which comment is being replied to
    setReplyingToComment: (state, action) => {
      state.replyToCommentId = action.payload;
    },
    // Action to clear reply/editing states
    clearCommentState: (state) => {
      state.editingCommentId = null;
      state.replyToCommentId = null;
    }
  },
  extraReducers: (builder) => {
    // Get Video Comments
    builder.addCase(getVideoComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getVideoComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to load comments';
    });

    // Add New Comment
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      // Add new comment to the beginning of the array
      state.comments.unshift(action.payload);
      // Clear reply state if this was a reply
      if (action.payload.replyTo) {
        state.replyToCommentId = null;
      }
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to add comment';
    });

    // Update Comment
    builder.addCase(updateComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
      // Find and update the comment in the array
      const index = state.comments.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
      state.editingCommentId = null;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to update comment';
    });

    // Delete Comment
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      // Remove the comment from the array
      state.comments = state.comments.filter(c => c._id !== action.payload._id);
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to delete comment';
    });
  }
});

// Export actions
export const { 
  setEditingComment, 
  setReplyingToComment, 
  clearCommentState 
} = commentSlice.actions;

// Export reducer
export default commentSlice.reducer;