import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '~/features/users/slice'
import boardsReducer from '~/features/boards/slice'


const rootReducer = combineReducers({
  users: usersReducer,
  boards: boardsReducer,
})


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
