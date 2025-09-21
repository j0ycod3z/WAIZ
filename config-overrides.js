const webpack = require('webpack');

module.exports = function override(config) {
  // Fix JSX runtime issue for react-dnd
  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-runtime': require.resolve('react/jsx-runtime.js')
  };
  
  return config;
};