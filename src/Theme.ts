import { createMuiTheme } from '@material-ui/core/styles'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  }
`

const theme = createMuiTheme({})

export default theme
