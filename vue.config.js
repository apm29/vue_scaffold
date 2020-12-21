const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";
const path = require("path");

module.exports = {
  publicPath: BASE_URL,
  assetsDir: "assets",
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  devServer: {
    port: 6230,
    open: process.platform === "darwin",
    host: "0.0.0.0",
    https: false,
    hotOnly: false,
    proxy: "http://localhost:8888" // string | Object
  },
  configureWebpack: {
    name: "e-road",
    plugins:
      process.env.NODE_ENV === "development"
        ? []
        : [
            //dist大小分析
            new BundleAnalyzerPlugin(),
            //压缩文件
            new CompressionWebpackPlugin({
              test: /\.js$|\.html$|.\css/, //匹配文件名
              threshold: 10240, //对超过10k的数据压缩
              deleteOriginalAssets: false //不删除源文件
            })
          ],
    externals: {
      vue: "Vue"
    },
    context: path.resolve(__dirname, "./"),
    //别名配置
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve("src")
      }
    }
  }
};
