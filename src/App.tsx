import React, {useEffect} from 'react'
import store from '~/store'
import axios from 'axios'
import {Provider as ReduxProvider} from 'react-redux'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import theme, {GlobalStyle} from '~/Theme'
import {UserService} from '~/features/users'


const App = () => {
  const getUser = async () => {
    const user = await UserService.login({
      email: 'user@email.com',
      password: '12345678',
    })
    console.log(user)
    const userBasicInfo = await UserService.getUserBasicInfo(1)
    console.log(userBasicInfo)
    const userWithNewBoard = await UserService.setUserMainBoard(1, 1)
    console.log('user with new main board', userWithNewBoard)
    const userWithNewFavorites = await UserService.setUserFavoriteBoards(1, [1, 2])
    console.log('user with new favorite boards', userWithNewFavorites)
    return user
  }

  useEffect(() => {
    axios.get('/api/')
    getUser()
  }, [])
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
