import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '~/features/users/slice'
import boardsReducer from '~/features/boards/slice'
import linksReducer from '~/features/links/slice'
import labelsReducer from '~/features/labels/slice'
import snackbarReducer from '~/features/snackbar/slice'


const rootReducer = combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  links: linksReducer,
  labels: labelsReducer,
  snackbar: snackbarReducer,
})


export default rootReducer
