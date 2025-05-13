import { configureStore } from '@reduxjs/toolkit'
import { commentsReducer } from './slices/comments'
import { postsReducer } from './slices/posts'
import { authReducer } from './slices/auth'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer
  }
})

export default store
