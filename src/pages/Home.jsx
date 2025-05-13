import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'

import { formatCreatedAt } from '../helper'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  const [tab, setTab] = useState(0)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    const sortBy = tab === 0 ? 'new' : 'popular'
    dispatch(fetchPosts(sortBy))
    dispatch(fetchTags())
  }, [tab])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
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
                      ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
                      : ''
                  }
                  user={post.user}
                  createdAt={formatCreatedAt(post.createdAt)}
                  viewsCount={post.viewsCount}
                  commentsCount={post.commentsCount}
                  tags={post.tags}
                  isEditable={userData?._id === post.user._id}
                />
              ))}
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          {' '}
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />
        </Grid>
      </Grid>
    </>
  )
}
