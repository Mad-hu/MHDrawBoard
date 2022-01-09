const 
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  env = process.env.NODE_ENV,
  loaders = require('./loaders'),
  plugins = require('./plugins'),
  {resolve} = require('./utils'),
  optimization = require('./optimization'),
  {zenconfig} = require('./config');

const generateConfig = (config, name) => {
  let uglify = name.indexOf('min') > -1;
  config = {
    mode: env,
    entry: {
      // 'babel-polyfill', 
      main: [resolve('src/index.ts')]
    },
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
    output: {
      path: resolve('dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      libraryTarget: 'umd'
    },
  }
  config.devServer = {
    hot: true,
    port: 5000,
    contentBase: resolve('.')
  };
  config.module = loaders;
  config.plugins = plugins;
  if (uglify) {
    // optimization
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          include: resolve('dist'),
        }),
      ]
    };
  }
  config.performance = {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  };

  return {
    ...config,
    ...zenconfig
  };
}

module.exports = generateConfig;