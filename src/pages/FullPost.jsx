import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../redux/slices/comments'
import { fetchPostById, updateCommentsCount } from '../redux/slices/posts'
import { formatCreatedAt } from '../helper'

export const FullPost = () => {
  const isLoading = useSelector(state => state.posts.post.status === 'loading')
  const { id } = useParams()
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts.post.item)
  const comments = useSelector(state => state.comments.comments)
  const isCommentsLoading = comments.status === 'loading'

  useEffect(() => {
    dispatch(fetchPostById(id))
    dispatch(fetchComments(id))
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost={true} />
  }

  const incrementCommentsCount = () => {
    dispatch(updateCommentsCount(post.commentsCount + 1))
  }

  return (
    <>
      <Post
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
        commentsCount={post.commentsCount}
        tags={post.tags}
        isFullPost={true}
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading}>
        <Index postId={id} incrementCommentsCount={incrementCommentsCount} />
      </CommentsBlock>
    </>
  )
}
