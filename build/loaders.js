const {loaders} = require('./config');

const assetsLoaders = [
  {
    test: /.txt/,
    use: 'raw-loader'
  },
]

const scriptLoaders = [
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  },
]

module.exports = {
  rules: assetsLoaders.concat(scriptLoaders, loaders ? loaders : [])
}; 