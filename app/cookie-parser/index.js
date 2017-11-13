const cookie_parser = require('cookie')
const Url = require('url')
// 白名单
const whiteNameList = ['/name_liyang']

module.exports = (ctx) => {
  let {res, resCtx, reqCtx} = ctx
  let {method, url} = ctx.req
  let {pathname} = ctx.reqCtx
  let {cookie} = ctx.req.headers

  let cookieObj = cookie_parser.parse(cookie)

  method = method.toLowerCase()
  Object.assign(reqCtx, Url.parse(url, true), {method})
  return Promise.resolve({
    then: (resolve, reject) => {
      const cookieStr = time => `authd=true;Max-Age=${time}`
      
      if(cookieObj['authd']) {
        resCtx.hasUser = true
        res.setHeader('set-Cookie', cookieStr(3600))
      }

      if(whiteNameList.indexOf(pathname) > -1) {
        res.setHeader('set-Cookie', cookieStr(3600))
      }

      if(pathname == '/logout_liyang') {
        res.setHeader('set-Cookie', cookieStr(0))
      }
      resolve()
    }
  })
}