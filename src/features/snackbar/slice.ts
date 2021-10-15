import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as types from './types'
import { RootState } from '~/store'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'


const createNotification = (message: SnackbarMessage, options: OptionsObject): types.Notification => {
  const key = options?.key || new Date().getTime() + Math.random()
  return {
    key,
    message,
    options,
    dismissed: false,
  }
}

interface SnackbarState {
  notifications: types.Notification[]
}

const initialState = {
  notifications: [],
} as SnackbarState

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<types.EnqueueMessage>) {
      const { message, options } = action.payload
      state.notifications.push(createNotification(message, options))
    },
    openSuccessSnackbar(state, action: PayloadAction<types.EnqueueMessage>) {
      const { message, options } = action.payload
      state.notifications.push(createNotification(message, {
        variant: 'success',
        ...options,
      }))
    },
    closeSnackbar(state, action: PayloadAction<SnackbarKey>) {
      const key = action.payload
      state.notifications = state.notifications.map(
        (notification) => notification.key === key ? { ...notification, dismissed: true } : notification,
      )
    },
    removeSnackbar(state, action: PayloadAction<SnackbarKey>) {
      const key = action.payload
      state.notifications = state.notifications.filter((notification) => notification.key !== key)
    },

  },
  extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const {
  openSnackbar,
  closeSnackbar,
  removeSnackbar,
  openSuccessSnackbar,
} = snackbarSlice.actions

export default snackbarSlice.reducer


export const selectAllNotifications = (state: RootState) => state.snackbar.notifications
