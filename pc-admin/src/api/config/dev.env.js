'use strict'
const merge = require('webpack-merge')
const prodEnv = require('../../../../../Downloads/mall-admin-web-master/config/prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8080"'
})
