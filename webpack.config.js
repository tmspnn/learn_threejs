/* Environment variables and version */
const isProduction = process.env.NODE_ENV == "production";
const version = require("./package.json").version;

/* Internal modules */
const fs = require("fs");

/* External modules */
const _ = require("lodash");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/* Entries */
const pages = fs.readdirSync("./app/pages");

/* Implementation */
module.exports = {
  context: __dirname + "/app",
  mode: isProduction ? "production" : "development",
  entry: _(pages)
    .keyBy()
    .mapValues((p) => `/pages/${p}/${p}.js`)
    .value(),
  output: {
    path: __dirname + "/build",
    filename: `[name]-${version}.js`,
    publicPath: ""
  },
  module: { rules: [] },
  resolve: { extensions: [".js", ".json"] },
  devtool: false,
  plugins: [
    new webpack.ProvidePlugin({ _: "lodash", THREE: "three" }),
    ...pages.map(
      (p) =>
        new HtmlWebpackPlugin({
          filename: `${p}.html`,
          chunks: [p],
          template: __dirname + "/app/template.html"
        })
    )
  ]
};
