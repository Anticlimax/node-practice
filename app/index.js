// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')
const urlParser = require('./url-parser')

class App {
  constructor() {
    this.middlewareArr = []
    this.middlewareChain = Promise.resolve()
  }

  use(middleware) {
    this
      .middlewareArr
      .push(middleware)
  }
  // 创建promise链
  composeMiddleware(context) {
    let {middlewareArr} = this
    // 根据中间件数组创建promise链
    middlewareArr.forEach(middleware => {
      this.middlewareChain = this
        .middlewareChain
        .then(() => {
          return middleware(context)
        })
    })
    return this.middlewareChain
  }

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

      let context = {
        req,
        reqCtx: {
          body: '', // post请求的数据
          query: {} // get请求的数据
        },
        res,
        resCtx: {
          headers: {}, // res的返回报文
          body: '' // 返回给前端的内容区
        }
      }
      // 中间件依赖 Promise + request + response Promise.resolve(参数) => 通过context对象来传递
      // 1. 每一块中间件相互独立，只需要关注修改context
      // 2. 设计了use和composeMiddleware这两个api用来创建promise链
      // 3. 开发者可以专注于中间件开发
      this
        .composeMiddleware(context)
        .then(() => {
          let base = {
            'X-powered-by': 'Node.js'
          }
          let {body, headers} = context.resCtx
          res.writeHead(200, 'resolve ok', {
            ...base,
            ...headers
          })
          res.end(body)
        })
    }
  }
}

module.exports = App