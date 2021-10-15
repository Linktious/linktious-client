import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'


const store = configureStore({
  reducer: rootReducer,
})

if (IS_DEVELOPMENT && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
