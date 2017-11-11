// 处理客户端数据 request: query + body + method

module.exports = (ctx) => {

  let {url, method} = ctx.req
  let {reqCtx} = ctx
  method = method.toLowerCase()

  return Promise.resolve({
    then: (resolve, reject) => {
      if (method == 'post') {
        let data = []
        ctx.req.on('data', (chunk) => {
          data.push(chunk)
        }).on('end', () => {
          let endData = Buffer.concat(data).toString()
          reqCtx.body = JSON.parse(endData)
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}