const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "zlib": require.resolve("browserify-zlib"),
    "querystring": require.resolve("querystring-es3"),
    "path": require.resolve("path-browserify"),
    "fs": false,
    "net": false,
    "tls": false,
    "crypto": false,
    "stream": false,
    "url": false,
    "http": false,
    "https": false,
    "assert": false,
    "os": false,
    "buffer": false
  };

  // Fix JSX runtime issue for react-dnd
  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-runtime': require.resolve('react/jsx-runtime.js')
  };

  // Add plugins if needed
  config.plugins = config.plugins || [];
  
  return config;
};