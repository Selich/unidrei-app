/* eslint-disable no-unused-expressions */
const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      (webpackConfig.resolve.fallback = {
        fs: false,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        buffer: require.resolve("buffer/"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
      }),
        (webpackConfig.resolve.alias = { buffer: "buffer" });
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        })
      );

      return webpackConfig;
    },
  },
};
