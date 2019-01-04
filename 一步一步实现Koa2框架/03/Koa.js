let http = require("http");
let compose = require("./compose");
let Stream = require('stream');

module.exports = class Koa {
  constructor() {
    // 这里用于初始化一些实例变量 如 middware
    this.middlewares = [];
  }
  /**
   *  Koa最终重要的方法之一，注册一个中间件
   */
  use(fn) {
    // 参数fn应该为‘function’,为了不影响阅读，这里参数fn验证跳过
    this.middlewares.push(fn);
    return this;
  }
  /**
   *  在实例化Koa对象后，调用listen方法，监听端口，开启WEB服务
   *  该方法内部会调用nodejs http模块的createServer方法创建
   *  一个 web server,并传入args参数
   */
  listen(...args) {
    let server = http.createServer((req, res) => this.callback(req, res));
    server.listen(...args);
  }
  /**
   *  在这里处理每一次的请求
   */
  callback(req, res) {
    // 这里要做的下面的几件事情
    // 1. compose middleware: 将中间件函数组合成一个函数 fn
    let middlwareFN = compose(this.middlewares);
    // 2. 将req和res封装为context对象,这里只做简单封装，更详细的后续将提及
    let context = { req, res };
    // 3. 处理请求,在处理请求（request）完后，再处理响应(response)
    this.handleRequest(context, middlwareFN);
  }
  /**
   *
   * @param  ctx 上下文对象
   * @param  middlwareFN  组合后的中间件函数
   */
  handleRequest(ctx, middlwareFN) {
    middlwareFN(ctx)
      .then(() => this.handleResponse(ctx))
      .catch(this.handleError); 
  }

  handleResponse(ctx) {
    let body = ctx.res.body;
    let res = ctx.res;
    // 处理不同类型的 context body
    if (Buffer.isBuffer(body)) return res.end(body);
    if ("string" == typeof body) return res.end(body);
    if (body instanceof Stream) return body.pipe(res);
    // body: json
    body = JSON.stringify(body);
    ctx.res.end(body);
  }
  handleError() {
    //处理错误略过
  }
};
