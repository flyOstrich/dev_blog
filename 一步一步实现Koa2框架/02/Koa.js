let http = require('http');
module.exports = class Koa {
  constructor() {
    // 这里用于初始化一些实例变量 如 middware
  }
  /**
   *  Koa最终重要的方法之一，注册一个中间件
   */
  use(fn) {}
  /**
   *  在实例化Koa对象后，调用listen方法，监听端口，开启WEB服务
   *  该方法内部会调用nodejs http模块的createServer方法创建
   *  一个 web server,并传入args参数
   */
  listen(...args) {
      let server = http.createServer(this.callback);
      server.listen(...args);
  }
  /**
   *  在这里处理每一次的请求
   */
  callback(req,res){
      // 这里要做的下面的几件事情
      // 1. compose middleware: 将中间件函数组合成一个函数 fn
      // 2. 将req和res封装为context对象
      // 3. 处理请求并返回结果
      res.end('this is KoaLite!');
  }
};
