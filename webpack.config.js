const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const envPlugin = new webpack.EnvironmentPlugin({
  REDIRECT_URI: "https://www.cket.live",
  UPDATES_URI: "wss://updates.cket.live",
});

module.exports = {
  entry: {
    scorer: "./src/scorer.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    envPlugin,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.ejs",
      hash: true,
    }),
  ],
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    hot: true,
    proxy: {
      "/api/*": "http://localhost:8082",
      "/updates": "http://localhost:8083",
      "/stream/*": "http://localhost:8084",
    },
    historyApiFallback: {
      index: "index.html",
    },
  },
  devtool: "source-map",
};
