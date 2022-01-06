const
  isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  entry: {},
}

const devConfig = {
  ...baseConfig,
  loaders: [],
  plugins: [],
  optimization: {}
}

const prodConfig = {
  ...baseConfig,
  optimization: {
    // splitChunks: {
    //   // include all types of chunks
    //   chunks: 'all'
    // }
  }
}

module.exports = isProd ? prodConfig : devConfig;