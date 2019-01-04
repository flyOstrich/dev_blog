module.exports = function(middlewares) {
  // middlewares 是用 app.use(fn) 注册的所有中间件，是一个数组
  return function(context, next) {
    let len = middlewares.len;
    let index = 0;
    if (len === 0) return Promise.resolve(); // 没注册任何中间件的情况
    return dispatch(index);
    /**
     * 从第 0 个中间件函数开始执行，并且将下一个中间件函数注入到当前执行的中间件函数中去，
     * 由当前的中间件函数决定是否继续往后执行接下来的函数
     * eg.
     *
     * app.use(async (ctx,next)=>{
     *    await next(); // 这里的next是下一个中间件函数，调用它则往后执行接下来的middleware
     * })
     *
     * @param i 中间件函数下标
     */
    function dispatch(i) {
      let fn = middlewares[i];
      index += 1;
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(context, dispatch.bind(null, index)));
    }
  };
};
