const webpack = require('webpack');

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',  // Enable source maps for better debugging
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser', // Ensure global availability
      }),
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': true, // Enable the Vue Options API
        '__VUE_PROD_DEVTOOLS__': false  // Disable Vue Devtools in production
      })
    ]
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false, // Disable overlay for errors and warnings
    },
    devMiddleware: {
      publicPath: '/' // Ensures assets are served from the correct path
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['__VUE_OPTIONS_API__'] = JSON.stringify(true);
      definitions[0]['__VUE_PROD_DEVTOOLS__'] = JSON.stringify(false);
      return definitions;
    });
  }
});
