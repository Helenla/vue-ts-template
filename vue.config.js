// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
  lintOnSave: false,
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
  },
  css: {
    modules: false, // 启用 CSS modules
    // extract: isEnvProd() ? true : false, // 是否使用css分离插件
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        data: '@import "@/assets/css/base.scss";'
      }
    } // css预设器配置项
  },
  devServer: {
    host: "localhost",
    port: 8080, // 端口
    proxy: {}
  }
};
