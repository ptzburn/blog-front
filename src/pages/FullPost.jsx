import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import ReactMarkdown from 'react-markdown'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.warn(error)
        alert('Unable to fetch the post.')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost={true} />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost={true}
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'John Doe',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
            },
            text: 'This is a test comment 555555'
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
      >
        <Index />
      </CommentsBlock>
    </>
  )
}
