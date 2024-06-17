const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "public"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Adds CSS to the DOM by injecting a <style> tag
          {
            loader: "css-loader",
            options: {
              sourceMap: true, // Enable source maps
            },
          },
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: require.resolve("crypto-browserify"), // Use crypto-browserify
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    new NodePolyfillPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "public"), // Serve files from this directory
    port: 3000, // Port for the development server
    open: true, // Open the default web browser when the server starts
    compress: true, // Enable gzip compression
  },
};
