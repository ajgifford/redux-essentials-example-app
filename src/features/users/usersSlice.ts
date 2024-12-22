import { RootState } from '@/app/store'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'

interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users,
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (!currentUsername) {
    return
  }
  return selectUserById(state, currentUsername)
}

export default userSlice.reducer
