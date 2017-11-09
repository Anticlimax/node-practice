// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')

class App {
  constructor() {}

  initServer() {
    return (req, res) => {
      let {url} = req
      let body = ''
      // 所有以action结尾的url 认为是ajax
      if (url.match('action')) {
        body = apiServer(url)
        res.writeHead(200, 'resolve ok', {
          'X-powered-by': 'Node.js',
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(body))
      } else {
        body = staticServer(url)
        res.writeHead(200, 'resolve ok', {'X-powered-by': 'Node.js'})
        res.end(body)
      }
    }
  }
}

module.exports = App