module.exports = {
    port: 10002,
    historyApiFallback: true, // 处理 路由history模式
    open: false,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const port = devServer.server.address().port;
      return ('http://localhost:', port);
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
}