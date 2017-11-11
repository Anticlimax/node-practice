const path = require('path')
const fs = require('fs')
const mime = require('mime')

let getPath = (url) => {
  return path.resolve(process.cwd(), 'public', `.${url}`)
}

let staticFunc = (ctx) => {
  let {url} = ctx.req
  let {resCtx} = ctx
  return new Promise((resolve, reject) => {
    if (!url.match('action') && url.match(/\./)) {
      let _path = getPath(url)
      resCtx.headers = {
        ...resCtx.headers,
        'Content-Type': mime.getType(_path)
      }
      let body = fs.readFile(_path, (err, data) => {
        if (err) {
          resCtx.body = `NOT FOUND${err.stack}`
        }
        resCtx.body = data
        resolve()
      })
    } else {
      resolve()
    }
  })
}

module.exports = staticFunc