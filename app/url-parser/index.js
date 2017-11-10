// 处理客户端数据 request: query + body + method

module.exports = (req) => {

  let {url, method, context} = req
  method = method.toLowerCase()

  return Promise.resolve({
    then: (resolve, reject) => {
      context.method = method
      context.query = {}


      if (method == 'post') {
        let data = ''
        req.on('data', (chunk) => {
          data += chunk
        }).on('end', () => {
          context.body = JSON.parse(data)
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}