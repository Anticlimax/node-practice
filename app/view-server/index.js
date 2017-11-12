// 映射表 ejs动态渲染

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const urlrewriteMap = require('./urlrewrite')

module.exports = (ctx) => {
  let {req, resCtx} = ctx
  let {url} = req
  return Promise.resolve({
    then: (resolve, reject) => {
      if (url.match('action') || url.match(/\./)) {
        resolve()
      } else {
        const viewPath = path.resolve(__dirname, 'ejs')
        let ejsName = urlrewriteMap[url]
        if (ejsName) {
          let layoutPath = path.resolve(viewPath, 'layout.ejs')
          let layoutHtml = fs.readFileSync(layoutPath, 'utf8')
          let htmlPath = path.resolve(viewPath, ejsName + '.ejs')
          // let html = fs.readFileSync(htmlPath, 'utf8')

          let render = ejs.compile(layoutHtml, {
            compileDebug: true,
            filename: layoutPath
          })

          let html = render({templateName: ejsName})

          resCtx.headers = {
            ...resCtx.headers,
            'Content-Type': mime.getType(htmlPath)
          }
          resCtx.body = html
          resolve()
        } else {
          // 重定向
          resCtx.headers = {
            ...resCtx.headers,
            'Location': '/'
          }
          resCtx.statusCode = 302
          resCtx.statusMessage = 'redirect'
          resCtx.body = ''
          resolve()
        }
      }
    }
  })
}