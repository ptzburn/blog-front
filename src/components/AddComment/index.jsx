import React from 'react'
import axios from '../../axios'
import styles from './AddComment.module.scss'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchComments } from '../../redux/slices/comments'

export const Index = ({ postId, incrementCommentsCount }) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const userData = useSelector(state => state.auth.data)
  const [text, setText] = useState('')

  const onSubmit = async () => {
    try {
      const comment = {
        text,
        id: postId,
        userId: userData._id
      }
      await axios.post(`/posts/${postId}/comments`, comment)
      incrementCommentsCount()
      dispatch(fetchComments(postId))
    } catch (error) {
      console.warn(error)
      alert('Unable to comment.')
    }
  }

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit()
      setText('')
    }
  }

  if (!isAuth) {
    return <></>
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={userData.avatarUrl} />
        <div className={styles.form}>
          <TextField
            value={text}
            onChange={e => setText(e.target.value)}
            label="Leave a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button
            onClick={handleSubmit}
            disabled={text.length === 0}
            variant="contained"
          >
            Send
          </Button>
        </div>
      </div>
    </>
  )
}
