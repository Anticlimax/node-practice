const path = require('path')
const fs = require('fs')

let getPath = (url) => {
  return path.resolve(process.cwd(), 'public', `.${url}`)
}

let staticFunc = (req) => {
  let {url} = req
  return new Promise((resolve, reject) => {
    if (url == '/') {
      url = '/index.html'
    }
    let _path = getPath(url)
    let body = ''
    body = fs.readFile(_path, (err, data) => {
      if (err) {
        resolve(`NOT FOUND${err.stack}`)
      }
      resolve(data)
    })
  })
}

module.exports = staticFunc