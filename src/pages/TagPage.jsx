import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post'
import { fetchPostsByTag } from '../redux/slices/posts'

export const TagPage = () => {
  const { tagName } = useParams()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts } = useSelector(state => state.posts)
  const isPostsLoading = posts.status === 'loading'

  useEffect(() => {
    dispatch(fetchPostsByTag(tagName))
  }, [])

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        #{tagName}
      </Typography>
      <Grid container spacing={4}>
        <Grid size={8}>
          {isPostsLoading
            ? [...Array(5)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : posts.items.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  imageUrl={
                    post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''
                  }
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable={userData?._id === post.user._id}
                />
              ))}
        </Grid>
      </Grid>
    </>
  )
}
