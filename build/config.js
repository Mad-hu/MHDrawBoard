const
  zenConfig = require('../zen.config'),
  {loaders, plugins, optimization} = zenConfig;

// 移除loaders、plugins属性
delete zenConfig.loaders;
delete zenConfig.plugins;
delete zenConfig.optimization;

module.exports = {
  loaders,
  zenPlugins: plugins,
  optimization,
  zenConfig
}