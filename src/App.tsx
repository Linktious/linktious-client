import React, {useEffect} from 'react'
import store from '~/store'
import axios from 'axios'
import {Provider as ReduxProvider} from 'react-redux'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import theme, {GlobalStyle} from '~/Theme'
import {
  userLogin,
  setUserMainBoard,
  setUserFavoriteBoards,
  fetchUserInfo,
} from '~/features/users'
import {useAppDispatch, useAppSelector} from '~/store/hooks'


const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.users.authenticatedUser)
  console.log(user)

  useEffect(() => {
    axios.get('/api/')
    dispatch(userLogin({
      email: 'user@email.com',
      password: '12345678',
    }))
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(setUserMainBoard(2))
      dispatch(setUserFavoriteBoards([1, 2]))
      dispatch(fetchUserInfo(1))
    }
  }, [dispatch, user?.id])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => <div>render</div>}/>
      </Switch>
    </BrowserRouter>
  )
}


const ProvidedApp = () => (
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <GlobalStyle/>
      <App/>
    </ReduxProvider>
  </ThemeProvider>
)


export default ProvidedApp
