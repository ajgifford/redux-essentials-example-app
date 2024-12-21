import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Andy Gifford' },
  { id: '1', name: 'Alison Gifford' },
  { id: '2', name: 'Ben Gifford' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find((user) => user.id === userId)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}

export default userSlice.reducer
