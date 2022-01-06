const
  path = require('path');

exports.resolve = function(pathname) {
  console.log('pathname>>>', pathname)
  return path.join(__dirname, '../', pathname);
}