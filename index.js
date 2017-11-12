const http = require('http')
const App = require('./app')
const server = new App()
const PORT = 7000
// 中间件
const staticServer = require('./app/static-server')
const apiServer = require('./app/api')
const urlParser = require('./app/url-parser')
const viewServer = require('./app/view-server')
const cookieParser = require('./app/cookie-parser')

server.use(cookieParser)
server.use(urlParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)

http.createServer(server.initServer()).listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})