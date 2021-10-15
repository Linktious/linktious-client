import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import * as types from './types'
import UserService from './service'
import { RootState } from '~/store'


export const userLogin = createAsyncThunk<types.User, types.UserCredentials, { state: RootState }>(
  'users/login',
  async (userCredentials) => {
    return await UserService.login(userCredentials)
  },
)

export const setUserMainBoard = createAsyncThunk<types.User, number, { state: RootState, rejectValue: string }>(
  'users/setUserMainBoard',
  async (boardId, { getState, rejectWithValue }) => {
    const authenticatedUser = getState().users.authenticatedUser
    if (authenticatedUser === null) {
      return rejectWithValue('User is not authenticated')
    }
    else {
      return await UserService.setUserMainBoard(authenticatedUser.id, boardId)
    }
  },
)

export const setUserFavoriteBoards = createAsyncThunk<types.User, number[], { state: RootState, rejectValue: string }>(
  'users/setUserFavoriteBoards',
  async (boardsIds, { getState, rejectWithValue }) => {
    const authenticatedUser = getState().users.authenticatedUser
    if (authenticatedUser === null) {
      return rejectWithValue('User is not authenticated')
    }
    else {
      return await UserService.setUserFavoriteBoards(authenticatedUser.id, boardsIds)
    }
  },
)

export const toggleUserFavoriteBoard = createAsyncThunk<types.User, number, { state: RootState, rejectValue: string }>(
  'users/toggleUserFavoriteBoard',
  async (boardId: number, { getState, rejectWithValue }) => {
    const authenticatedUser = getState().users.authenticatedUser
    if (authenticatedUser === null) {
      return rejectWithValue('User is not authenticated')
    }

    let favoriteBoardIds
    if (authenticatedUser.favoriteBoards.includes(boardId)) {
      favoriteBoardIds = authenticatedUser.favoriteBoards.filter((favoriteBoardId) => favoriteBoardId !== boardId)
    }
    else {
      favoriteBoardIds = [...authenticatedUser.favoriteBoards, boardId]
    }

    return await UserService.setUserFavoriteBoards(authenticatedUser.id, favoriteBoardIds)
  },
)

export const fetchUserInfo = createAsyncThunk<types.UserBasicInfo, number>(
  'users/fetchUserInfo',
  async (userId) => {
    return await UserService.getUserBasicInfo(userId)
  },
)

interface UsersState {
  authenticatedUser: types.User | null,
  users: {
    [id: number]: types.UserBasicInfo
  }
}

const initialState = {
  authenticatedUser: null,
  users: {},
} as UsersState

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload
    })

    builder.addCase(setUserMainBoard.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload
    })

    builder.addCase(setUserFavoriteBoards.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload
    })

    builder.addCase(toggleUserFavoriteBoard.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload
    })

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      const userInfo = action.payload
      state.users[userInfo.id] = userInfo
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = usersSlice.actions

export default usersSlice.reducer

export const selectUserById = (userId: number) => (state: RootState) => state.users.users[userId]
export const selectAuthenticatedUser = (state: RootState) => state.users.authenticatedUser
export const selectFavoriteBoards = (state: RootState) => {
  const authenticatedUser = selectAuthenticatedUser(state)

  return authenticatedUser ? authenticatedUser.favoriteBoards : []
}

