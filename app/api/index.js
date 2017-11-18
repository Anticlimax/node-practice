let Router = require('./ajax')

module.exports = (ctx) => {
  let {pathname, method} = ctx.reqCtx
  let {resCtx, reqCtx} = ctx
  let {res} = ctx

  // method = method.toLowerCase()

  return Promise.resolve({
    then: (resolve, reject) => {
      if (pathname.match('action')) {
        return Router
          .routers(ctx)
          .then(val => {
            resCtx.body = JSON.stringify(val)
            resCtx.headers = {
              ...resCtx.headers,
              'Content-Type': 'application/json'
            }
            resolve()
          })
      }
      resolve()
    }
  })
}