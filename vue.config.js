/* eslint-disable @typescript-eslint/camelcase */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const resolve = dir => {
  return path.join(__dirname, "./", dir);
};
const isProd = () => {
  return process.env.NODE_ENV === "production";
};

// 生产环境去掉 console.log
const getOptimization = () => {
  let optimization = {};
  if (isProd()) {
    optimization = {
      minimize: true, // 不混淆压缩js代码
      // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              warnings: false,
              drop_console: false, // 打开console
              drop_debugger: true
              // pure_funcs: ['console.log'] // 测试开发暂时放开console限制
            }
          }
        })
      ]
    };
  }
  return optimization;
};

module.exports = {
  publicPath: "./",
  assetsDir: "static",
  lintOnSave: !isProd(),
  productionSourceMap: false,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {}
  },
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });

    // 分析打包后的大小
    config.when(process.env.IS_ANALYZ, config =>
      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin, [
        {
          analyzerPort: 8887,
          generateStatsFile: false
        }
      ])
    );
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@assets": resolve("src/assets"),
        "@components": resolve("src/components"),
        "@store": resolve("src/store"),
        "@images": resolve("src/assets/img"),
        variable: resolve("src/scss/variable.scss")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
      // 我们只需要momentjs的中文语言就行
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    ],
    optimization: getOptimization()
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/base.scss";'
      }
    }
  }
};
