// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (commentId) => {
    const data = await fetch(`api/articles/${commentId}/comments`);
    return data.json();
  }
);

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      byArticleId: {},
      isLoadingComments: false,
      failedToLoadComments: false,

    },
    extraReducers: (builder) => {
      builder
        .addCase(loadCommentsForArticleId.pending, (state) => {
          state.isLoadingComments = true;
          state.failedToLoadComments = false;
        })
        .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
          state.isLoadingComments = false;
          state.byArticleId[action.payload.articleId]= action.payload.comments;
        })
        .addCase(loadCommentsForArticleId.rejected, (state, action) => {
          state.isLoadingComments = false;
          state.failedToLoadComments = true;
          state.byArticleId = [];
        })
    },
  });
  
  export const selectComments = (state) => state.comments.byArticleId;
  export const isLoadingComments = (state) => state.comments.isLoadingComments;
  export const createCommentIsPending = (state) => state.comments.createCommentIsPending;
  
  export default commentsSlice.reducer;
  