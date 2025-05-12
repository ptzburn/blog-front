import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'

import { useEffect } from 'react'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid size={8}>
          {isPostsLoading
            ? [...Array(5)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : posts.items.map(post => (
                <Post
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
        <Grid size={4}>
          {' '}
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'John Doe',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
                },
                text: 'This is a test comment'
              },
              {
                user: {
                  fullName: 'Henry Morgan',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg'
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top'
              }
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
