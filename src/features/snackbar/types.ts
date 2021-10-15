import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'


export interface EnqueueMessage {
  message: SnackbarMessage
  options?: OptionsObject
}

export interface Notification {
  key: SnackbarKey
  message: SnackbarMessage
  options?: OptionsObject
  dismissed: boolean
}
