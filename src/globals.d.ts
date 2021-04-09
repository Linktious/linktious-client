/* eslint-disable no-unused-vars */
// This file corellates directly to `settings.js` file injectedVars - for define plugin

type WebpackConfig = {
}
type AvailableEnvs = 'production' | 'development'

declare const BUILD_CONFIG: WebpackConfig
declare const ALL_CONFIGS: { [envName in AvailableEnvs]: WebpackConfig }
declare const ENV: AvailableEnvs
declare const IS_DEVELOPMENT: boolean
