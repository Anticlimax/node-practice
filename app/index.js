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
      let headers = {}
      // 所有以action结尾的url 认为是ajax
      if (url.match('action')) {
        apiServer(url).then(val => {
          body = JSON.stringify(val)
          headers = {
            'Content-Type': 'application/json'
          }
          res.writeHead(200, 'resolve ok', {
            'X-powered-by': 'Node.js',
            ...headers
          })
          res.end(body)
        })
      } else {
        staticServer(url).then((body) => {
          res.writeHead(200, 'resolve ok', {
            'X-powered-by': 'Node.js',
            ...headers
          })
          res.end(body)
        })
      }
    }
  }
}

module.exports = App