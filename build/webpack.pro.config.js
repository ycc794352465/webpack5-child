const merge = require("webpack-merge").merge;
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: "cheap-module-source-map"
});