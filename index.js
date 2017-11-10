const http = require('http')
const App = require('./app')
const server = new App()
const PORT = 7000
// 中间件
const staticServer = require('./app/static-server')
const apiServer = require('./app/api')
const urlParser = require('./app/url-parser')
server.use(urlParser)
server.use(apiServer)
server.use(staticServer)

http.createServer(server.initServer()).listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})