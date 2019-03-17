const path = require("path")
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
    ]
  },
  devServer: {
    // 在此文件夹下启动服务，可以直接访问html文件，但是js在开发模式是访问的内存中的
    contentBase: path.join(__dirname, 'dist'),
    compress: true,// gzip压缩
    port: 9000,
    // hot:true,
    open:true,//命令行可以--open
    openPage: 'index.html',
    allowedHosts: [     // 请求白名单列表
      'subdomain.host.com',
      'subdomain2.host.com',
      '.host.com',
      'host2.com',
    ],
    before: function(app, server) {
      app.get('/aaaa', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
