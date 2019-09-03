'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"preprod"',
  BASE_API: '"https://api.preisesol.com/cgi"'
})
