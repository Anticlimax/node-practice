module.exports = (ctx) => {
  let {pathname, method} = ctx.reqCtx
  let {resCtx, reqCtx} = ctx
  let {res} = ctx

  let apiMap = {
    '/list.action': [
      '吉他', '三只松鼠', 'mongodb'
    ],
    '/user.action': ['hello', 'world', 'liyang']
  }
  // method = method.toLowerCase()

  return Promise.resolve({
    then: (resolve, reject) => {
      if (pathname.match('action')) {
        if (method == 'get') {
          resCtx.body = JSON.stringify(apiMap[pathname])
        } else {
          let {body} = reqCtx
          resCtx.body = JSON.stringify(body)
        }
        resCtx.headers = {
          ...resCtx.headers,
          'Content-Type': 'application/json'
        }
      }
      resolve()
    }
  })
}