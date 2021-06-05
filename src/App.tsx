import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import store from '~/store'
import { useAppDispatch } from '~/store/hooks'
import theme, { GlobalStyle } from '~/Theme'
import { userLogin } from '~/features/users'
import Board, { fetchBoards } from '~/features/boards'
import Link, { fetchLinks } from '~/features/links'
import { fetchLabels } from '~/features/labels'


const App = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    await Promise.all([
      dispatch(userLogin({
        email: 'user@email.com',
        password: '12345678',
      })),
      dispatch(fetchBoards()),
      dispatch(fetchLinks()),
      dispatch(fetchLabels()),
    ])
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchData().then(() => console.log('Fetched data!'))
  }, [dispatch])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/boards" render={() => <Board boardId={1}/>}/>
        <Route path="/link" render={() => <Link linkId={1}/>}/>
        <Route path="/" render={() => <div>render</div>}/>
      </Switch>
    </BrowserRouter>
  )
}


const ProvidedApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <GlobalStyle/>
        <App/>
      </ReduxProvider>
    </ThemeProvider>
  </MuiThemeProvider>
)


export default ProvidedApp
