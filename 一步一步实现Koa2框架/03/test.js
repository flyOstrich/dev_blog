let koa = require('./Koa')
let app = new koa()
app.use(async (ctx,next)=>{
    ctx.res.body= "<p>this is the first middleware</p>"
    await next();
})
app.use(async (ctx,next)=>{
    ctx.res.body+= "<p>this is the second middleware</p>"
    await next();
})
app.use(async (ctx,next)=>{
    ctx.res.body+= "<p>this is the third middleware</p>"
    await next();
})
app.listen(3000);