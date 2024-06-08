const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components/"),
      views: path.resolve(__dirname, "src/views/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      utils: path.resolve(__dirname, "src/utils/"),
      queries: path.resolve(__dirname, "src/queries/"),
      _mocks_: path.resolve(__dirname, "src/_mocks_/"),
    },
  },
  mode: "development",
  devServer: {
    historyApiFallback: true,
  },
};
