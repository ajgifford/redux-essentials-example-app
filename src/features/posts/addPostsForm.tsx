import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addNewPost, Post } from './postsSlice'
import { id } from 'date-fns/locale'
import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)!

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId })).unwrap()
      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  useEffect(() => {
    if (document.getElementById('savePostButton')) {
      const savePostButton = document.getElementById('savePostButton') as HTMLButtonElement
      savePostButton.disabled = addRequestStatus === 'pending'
    }
  }, [addRequestStatus])

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button id="savePostButton">Save Post</button>
      </form>
    </section>
  )
}
