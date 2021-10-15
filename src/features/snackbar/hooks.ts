import React from 'react'
import { useDispatch } from 'react-redux'
import { SnackbarKey, useSnackbar } from 'notistack'
import { useAppSelector } from '~/store/hooks'
import { selectAllNotifications, removeSnackbar } from '~/features/snackbar/slice'

let displayed: SnackbarKey[] = []

const useSnackbarNotifier = () => {
  const dispatch = useDispatch()
  const notifications = useAppSelector(selectAllNotifications)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey)
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(myKey))
          removeDisplayed(myKey)
        },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useSnackbarNotifier
