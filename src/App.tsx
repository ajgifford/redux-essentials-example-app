import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { SinglePostPage } from './features/posts/singlePostPage'
import PostsMainPage from './features/posts/postsMainPage'
import { EditPostForm } from './features/posts/editPostForm'
import { LoginPage } from './features/auth/loginPage'
import { useAppSelector } from './app/hooks'
import { selectCurrentUsername } from './features/auth/authSlice'
import { UsersList } from './features/users/usersList'
import { UserPage } from './features/users/userPage'
import { NotificationsList } from './features/notifications/notificationsList'
import { ToastContainer } from 'react-tiny-toast'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationsList />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
