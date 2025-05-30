import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post'
import { fetchPostsByTag } from '../redux/slices/posts'
import { formatCreatedAt } from '../helper'

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
        <Grid size={{ xs: 12, sm: 8 }}>
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
                    post.imageUrl
                      ? `https://awesome-blog-c4b86ea6a2fe.herokuapp.com${post.imageUrl}`
                      : ''
                  }
                  user={post.user}
                  createdAt={formatCreatedAt(post.createdAt)}
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
