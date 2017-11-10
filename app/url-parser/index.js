// 处理客户端数据 request: query + body + method

module.exports = (ctx) => {

  let {url, method} = ctx.req
  let {reqCtx} = ctx
  method = method.toLowerCase()

  return Promise.resolve({
    then: (resolve, reject) => {
      if (method == 'post') {
        let data = ''
        ctx.req.on('data', (chunk) => {
          data += chunk
        }).on('end', () => {
          reqCtx.body = JSON.parse(data)
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}