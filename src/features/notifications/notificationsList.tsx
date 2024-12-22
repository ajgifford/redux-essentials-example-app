import { useAppDispatch, useAppSelector } from '@/app/hooks'
import classnames from 'classnames'
import { TimeAgo } from '@/components/timeAgo'

import { PostAuthor } from '@/features/posts/postAuthor'

import { allNotificationsRead, selectAllNotifications } from './notificationsSlice'
import { useLayoutEffect } from 'react'

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const notificationsClassname = classnames('notificatoin', {
      new: notification.isNew,
    })
    return (
      <div key={notification.id} className={notificationsClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
