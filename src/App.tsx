import React, {useEffect} from 'react'
import store from '~/store'
import axios from 'axios'
import {Provider as ReduxProvider} from 'react-redux'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import theme, {GlobalStyle} from '~/Theme'


const App = () => {

  useEffect(() => {
    axios.get('/api/')
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
