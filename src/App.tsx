import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import styled, { ThemeProvider } from 'styled-components'
import store from '~/store'
import { useAppDispatch } from '~/store/hooks'
import theme, { GlobalStyle } from '~/Theme'
import { userLogin } from '~/features/users'
import Board, { fetchBoards } from '~/features/boards'
import Link, { fetchLinks } from '~/features/links'
import { fetchLabels } from '~/features/labels'


const Root = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  margin: 16px;
`

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
    <Content>
      <BrowserRouter>
        <Switch>
          <Route path="/board" render={() => <Board boardId={1}/>}/>
          <Route path="/link" render={() => <Link linkId={1}/>}/>
          <Route path="/" render={() => <div>render</div>}/>
        </Switch>
      </BrowserRouter>
    </Content>
  )
}


const ProvidedApp = () => (
  <Root>
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <GlobalStyle/>
          <App/>
        </ReduxProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </Root>

)


export default ProvidedApp
