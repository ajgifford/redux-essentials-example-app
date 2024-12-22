import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Link } from 'react-router-dom'
import {
  fetchPosts,
  Post,
  selectAllPosts,
  selectPostById,
  selectPostError,
  selectPostIds,
  selectPostsStatus,
} from './postsSlice'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from '@/components/timeAgo'
import { ReactionButtons } from './reactionButtons'
import { useEffect } from 'react'
import { Spinner } from '@/components/Spinner'
import { useSelector } from 'react-redux'

interface PostExcerptProps {
  postId: string
}

function PostExcerpt({ postId }: PostExcerptProps) {
  const post = useAppSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const orderedPosts = useSelector(selectPostIds)
  const postStatus = useAppSelector(selectPostsStatus)
  const postError = useAppSelector(selectPostError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((postId) => <PostExcerpt key={postId} postId={postId} />)
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
