import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '~/features/users/slice'
import boardsReducer from '~/features/boards/slice'
import linksReducer from '~/features/links/slice'


const rootReducer = combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  links: linksReducer,
})


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
