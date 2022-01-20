const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const prodConfig = require('./webpack.prod.js');
const webpack = require('webpack');


module.exports = (envVars) => {
  const { env } = envVars
  const IS_CLIENT = env === 'client';
  const IS_SERVER = env === 'server';
  if (env === 'client') {
    const clientConfig = require('./webpack.client.js');
    const config = merge(commonConfig, prodConfig, clientConfig)
    config.plugins.push(
      new webpack.DefinePlugin({
        IS_CLIENT: JSON.stringify(IS_CLIENT),
        IS_SERVER: JSON.stringify(IS_SERVER),
        'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
      }),
    );
    return config;
  }
  if (env === 'server') {
    const serverConfig = require('./webpack.server.js')
    const config = merge(commonConfig, prodConfig, serverConfig)
    config.plugins.push(
      new webpack.DefinePlugin({
        IS_CLIENT: JSON.stringify(IS_CLIENT),
        IS_SERVER: JSON.stringify(IS_SERVER),
        'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
      }),
    );
    return config
  }
  const envConfig = require(`./webpack.${env}.js`)
  return merge(commonConfig, envConfig);
}
