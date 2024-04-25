const webpack = require('webpack');  // Ensure webpack is required at the top

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser') // Corrected to 'process'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser', // Ensure global availability
      }),
    ]
  }
});
