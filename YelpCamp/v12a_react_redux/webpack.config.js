require("dotenv").config();
module.exports = {
  mode: "development",
  // use index.jsx as entry pt
  entry: ["@babel/polyfill", "./frontend/src/views/index.js"],
  // our whole react app will be compiled into one file, ./dist/bundle.js
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist",
      publicPath: "/"
  },
  // configuring loaders
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ["@babel/preset-env", '@babel/preset-react']
              }
          }
      ]
  },

  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true
  },
  watch: true,
  resolve: {
      extensions: [".js",  ".jsx"]
  }
};