
const currentEnv = process.env.NODE_ENV ?? 'development'
const isDevelopment = currentEnv !== 'production'
const globalVars = {
  IS_DEVELOPMENT: isDevelopment,
  BUILD_CONFIG: {},
  ENV: currentEnv,
}

module.exports = {
  globalVars,
  isDevelopment,
  currentEnv,
}
