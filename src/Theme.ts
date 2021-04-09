import {createGlobalStyle, DefaultTheme} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  }
`

const theme: DefaultTheme = {

}

export interface ThemeProps {
  theme: DefaultTheme
}

export default theme
