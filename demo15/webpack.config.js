const path = require("path")
const webpack = require('webpack');

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
  plugins:[
    new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),   //hot module replacement 启动模块热替换的插件
  ],
  devServer: {
    // 在此文件夹下启动服务，可以直接访问html文件，但是js在开发模式是访问的内存中的
    contentBase: path.join(__dirname, 'dist'),
    compress: true,// gzip压缩
    port: 9000,
    // historyApiFallback : true,//让所有404的页面定位到index.html ，对应命令行是--history-api-fallback
    // hotOnly:true,//表示只会对可以热更新的部分进行热更新
    hot:true,//注意这个选项依赖插件HotModuleReplacementPlugin ,如果插件里没有开启，此选项开启会报错
    // open:true,//命令行可以--open
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


/* 命令行对应参数如下

--content-base <file/directory/url/port>: base path for the content.
--quiet: don’t output anything to the console.
--no-info: suppress boring information.
--colors: add some colors to the output.
--no-colors: don’t use colors in the output.
--compress: use gzip compression.
--host <hostname/ip>: hostname or IP. 0.0.0.0 binds to all hosts.
--port <number>: port.
--inline: embed the webpack-dev-server runtime into the bundle.
--hot: adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice.
--hot --inline also adds the webpack/hot/dev-server entry.
--public: overrides the host and port used in --inline mode for the client (useful for a VM or Docker).
--lazy: no watching, compiles on request (cannot be combined with --hot).
--https: serves webpack-dev-server over HTTPS Protocol. Includes a self-signed certificate that is used when serving the requests.
--cert, --cacert, --key: Paths the certificate files.
--open: opens the url in default browser (for webpack-dev-server versions > 2.0).
--history-api-fallback: enables support for history API fallback.
--client-log-level: controls the console log messages shown in the browser. Use error, warning, info or none.

*/