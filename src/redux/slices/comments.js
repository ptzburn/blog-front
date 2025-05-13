import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async postId => {
    const { data } = await axios.get(`/posts/${postId}/comments`)
    return data
  }
)

const initialState = {
  comments: {
    items: [],
    status: 'loading'
  }
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //Fetching comments
      .addCase(fetchComments.pending, state => {
        state.comments.items = []
        state.comments.status = 'loading'
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments.items = action.payload
        state.comments.status = 'loaded'
      })
      .addCase(fetchComments.rejected, state => {
        state.comments.items = []
        state.comments.status = 'error'
      })
  }
})

export const commentsReducer = commentsSlice.reducer
