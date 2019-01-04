module.exports = class Koa {
  constructor() {
    // 这里用于初始化一些实例变量 如 middware
  }
  /**
   *  Koa最终重要的方法之一，注册一个中间件
   */
  use(fn) {}
  /**
   *  在实例化Koa对象后，调用listen方法，监听端口，开启WEB服务
   *  该方法内部会调用nodejs http模块的createServer方法创建
   *  一个 web server,并传入args参数
   */
  listen(...args) {}
};