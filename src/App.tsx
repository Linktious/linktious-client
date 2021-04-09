import React from 'react'
import store from '~/store'
import {Provider as ReduxProvider} from 'react-redux'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import theme, {GlobalStyle} from '~/Theme'

const App = () => {
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
