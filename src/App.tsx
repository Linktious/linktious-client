import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import styled, { ThemeProvider } from 'styled-components'
import { SnackbarProvider } from 'notistack'
import store from '~/store'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import theme, { GlobalStyle } from '~/Theme'
import { userLogin } from '~/features/users'
import { fetchBoards, BoardWithLinks, FavoriteBoards } from '~/features/boards'
import { fetchLinks } from '~/features/links'
import { fetchLabels } from '~/features/labels'
import { selectAuthenticatedUser } from '~/features/users/slice'
import { Sidebar } from '~/features/sidebar'
import ExploreLinks from '~/features/links/ExploreLinks'
import ExploreLabels from '~/features/labels/ExportLabels'
import ExploreBoards from './features/boards/ExploreBoards'
import useSnackbarNotifier from '~/features/snackbar/hooks'


const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex: 1;
  display: flex;
`

const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  margin-left: 8px;
`

const BoardWithLayout = styled(BoardWithLinks)`
  flex: 3;
`

const Home = () => {
  const user = useAppSelector(selectAuthenticatedUser)
  if (!user) {
    return null
  }
  else if (user.mainBoardId >= 0) {
    return (
      <Redirect to={`/board/${user.mainBoardId}`} />
    )
  }
  else {
    return (
      <Redirect to="/boards" />
    )
  }
}

const App = () => {
  useSnackbarNotifier()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    return await Promise.all([
      dispatch(userLogin({
        email: 'user@email.com',
        password: '12345678',
      })),
      dispatch(fetchBoards()),
      dispatch(fetchLinks()),
      dispatch(fetchLabels()),
    ])
  }

  useEffect(() => {
    setLoading(true)
    fetchData().then(() => {
      setLoading(false)
    })
  }, [dispatch])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Sidebar />
        <Content>
          <Switch>
            <Route path="/board/:boardId">
              <BoardWithLayout/>
            </Route>
            <Route path="/links">
              <ExploreLinks />
            </Route>
            <Route path="/boards/">
              <ExploreBoards />
            </Route>
            <Route path="/favorite-boards/">
              <FavoriteBoards />
            </Route>
            <Route path="/labels/">
              <ExploreLabels />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
      </QueryParamProvider>
    </BrowserRouter>
  )
}


const ProvidedApp = () => (
  <Root>
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <ReduxProvider store={store}>
            <GlobalStyle/>
            <App/>
          </ReduxProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </Root>

)


export default ProvidedApp
