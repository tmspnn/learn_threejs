// Environment and version
const isProduction = process.env.NODE_ENV == "production";
const version = require("./package.json").version;

const _ = require("lodash");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Pages
const pages = ["index", "text"];

module.exports = {
    context: __dirname + "/app",
    entry: _(pages)
        .keyBy()
        .mapValues((p) => `/pages/${p}.js`)
        .value(),
    mode: isProduction ? "production" : "development",
    output: {
        path: __dirname + "/build",
        filename: `[name]-${version}.js`,
        publicPath: ""
    },
    module: { rules: [] },
    resolve: { extensions: [".js", ".json"] },
    devtool: isProduction ? "nosources-source-map" : "cheap-module-source-map",
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
