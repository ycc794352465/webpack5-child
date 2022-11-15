const merge = require("webpack-merge").merge;
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "source-map"
});