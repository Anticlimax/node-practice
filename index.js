const http = require('http')
const App = require('./app')
const server = new App()
const PORT = 7000
http.createServer(server.initServer()).listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})