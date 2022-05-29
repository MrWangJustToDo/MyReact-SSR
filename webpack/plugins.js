const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 输出所有资源路径
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
// loadable json
const LoadablePlugin = require("@loadable/webpack-plugin");
// 抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pluginsConfig = ({ env, isDev = true, isSSR = true, isMiddleWareDevelop = false, isAnimationRouter = false, isCSR = false, currentUI }) => {
  return [
    new CleanWebpackPlugin(),
    env === "client" && new LoadablePlugin({ filename: "manifest-loadable.json" }),
    env === "client" && new WebpackManifestPlugin({ fileName: isDev ? "manifest-dev.json" : "manifest-prod.json" }),
    new webpack.DefinePlugin({
      __SSR__: isSSR,
      __CSR__: isCSR, // pure client render
      __CLIENT__: env === "client",
      __SERVER__: env === "server",
      __DEVELOPMENT__: isDev,
      __UI__: JSON.stringify(currentUI),
      __MIDDLEWARE__: isMiddleWareDevelop,
      __ANIMATE_ROUTER__: isAnimationRouter,
      __BUILD_TIME__: JSON.stringify(new Date().toLocaleString()),
    }),
    env === "client" &&
      new MiniCssExtractPlugin({
        filename: isDev ? "[name].css" : "[name]-[contenthash].css",
        chunkFilename: isDev ? "css/[id].css" : "[id].[contenthash].css",
      }),
  ].filter(Boolean);
};

exports.pluginsConfig = pluginsConfig;
