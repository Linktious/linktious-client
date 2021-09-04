declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {}
}
