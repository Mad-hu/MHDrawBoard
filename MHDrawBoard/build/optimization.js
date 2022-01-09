const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  {resolve} = require('./utils'),
  {optimization} = require('./config');

console.log('optimization>>>', optimization)
module.exports = {
  minimizer: [
    // @todo
    new UglifyJsPlugin({
      sourceMap: true,
      include: resolve('dist'),
      parallel: 4,
    }),
  ],
  ...(optimization ? optimization : {})
}