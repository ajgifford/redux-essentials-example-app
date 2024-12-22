import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'

interface User {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const initialState: User[] = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find((user) => user.id === userId)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}

export default userSlice.reducer
