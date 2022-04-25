let publicPath = process.env.NODE_ENV === 'production' ? './' : './';
const webpack = require('webpack');

module.exports = {
  publicPath,
  productionSourceMap: false,
  configureWebpack: {
    //支持jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery",
      })
    ]},
};
