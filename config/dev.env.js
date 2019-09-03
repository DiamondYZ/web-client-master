'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://api.isesoldev.com/cgi"',
  BASE_API: '"http://192.168.1.101:8080/gap"',
  DEBUG_BASE_API: '"http://192.168.1.101:8080"',
})
