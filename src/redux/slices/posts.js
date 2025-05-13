import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async sortBy => {
  const { data } = await axios.get(`/posts?sortBy=${sortBy}`)
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags')
  return data
})

export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async tagName => {
    const { data } = await axios.get(`/tags/${tagName}`)
    return data
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async id => {
    const { data } = await axios.get(`/posts/${id}`)
    return data
  }
)

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async id => axios.delete(`/posts/${id}`)
)

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  post: { item: null, status: 'loading' },
  tags: {
    items: [],
    status: 'loading'
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateCommentsCount(state, action) {
      if (state.post.item) {
        state.post.item.commentsCount = action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      //Fetching posts
      .addCase(fetchPosts.pending, state => {
        state.posts.items = []
        state.posts.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload
        state.posts.status = 'loaded'
      })
      .addCase(fetchPosts.rejected, state => {
        state.posts.items = []
        state.posts.status = 'error'
      })
      //Fetching tags
      .addCase(fetchTags.pending, state => {
        state.tags.items = []
        state.tags.status = 'loading'
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload
        state.tags.status = 'loaded'
      })
      .addCase(fetchTags.rejected, state => {
        state.tags.items = []
        state.tags.status = 'error'
      })
      //Deleting post
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(
          post => post._id !== action.meta.arg
        )
      })
      .addCase(fetchRemovePost.rejected, state => {
        state.posts.status = 'error'
      })
      //Fetching posts by tag
      .addCase(fetchPostsByTag.pending, state => {
        state.posts.items = []
        state.posts.status = 'loading'
      })
      .addCase(fetchPostsByTag.fulfilled, (state, action) => {
        state.posts.items = action.payload
        state.posts.status = 'loaded'
      })
      .addCase(fetchPostsByTag.rejected, state => {
        state.posts.items = []
        state.posts.status = 'error'
      })
      //Fetching a post by id
      .addCase(fetchPostById.pending, state => {
        state.post.status = 'loading'
        state.post.item = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.post.status = 'loaded'
        state.post.item = action.payload
      })
      .addCase(fetchPostById.rejected, state => {
        state.post.status = 'error'
        state.post.item = null
      })
  }
})

export const postsReducer = postsSlice.reducer

export const { updateCommentsCount } = postsSlice.actions
