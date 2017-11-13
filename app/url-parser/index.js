// 处理客户端数据 request: query + body + method

const Url = require('url')
module.exports = (ctx) => {

  let {method} = ctx.reqCtx
  let {reqCtx} = ctx

  // method = method.toLowerCase()
  // Object.assign(reqCtx, Url.parse(url, true), {method})
  // console.log(reqCtx)
  
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