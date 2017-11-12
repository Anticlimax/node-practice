const cookie_parser = require('cookie')
// 白名单
const whiteNameList = ['/name_liyang']

module.exports = (ctx) => {
  let {url} = ctx.req
  let {cookie} = ctx.req.headers
  let {res, resCtx} = ctx
  let cookieObj = cookie_parser.parse(cookie)
  return Promise.resolve({
    then: (resolve, reject) => {
      const cookieStr = time => `authd=true;Max-Age=${time}`
      
      if(cookieObj['authd']) {
        resCtx.hasUser = true
        res.setHeader('set-Cookie', cookieStr(3600))
      }

      if(whiteNameList.indexOf(url) > -1) {
        res.setHeader('set-Cookie', cookieStr(3600))
      }

      if(url == '/logout_liyang') {
        res.setHeader('set-Cookie', cookieStr(0))
      }
      resolve()
    }
  })
}