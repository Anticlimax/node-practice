// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')
const urlParse = require('./url-parser')

class App {
  constructor() {}

  initServer() {
    return (req, res) => {

      let body = ''
      let headers = {}
      // 所有以action结尾的url 认为是ajax

      req.context = {
        body: '',
        query: '',
        method: 'get'
      }
      urlParse(req).then(val => {
        return apiServer(req)
      }).then(val => {
        if (!val) {
          // Promise
          return staticServer(req)
        } else {
          return val
        }
      }).then(val => {
        let base = {
          'X-powered-by': 'Node.js'
        }
        let body = ''
        if (val instanceof Buffer) {
          body = val
          res.end(body)
        } else {
          body = JSON.stringify(val)
          let finalHeader = {
            ...base,
            'Content-Type': 'application/json'
          }
          res.writeHead(200, 'resolve ok', finalHeader)
        }
        res.end(body)
      })
    }
  }
}

module.exports = App