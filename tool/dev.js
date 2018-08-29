const _handler = require('serve-handler')
const _http = require('http')

const PORT = 8000

let server = _http.createServer((req, res) => {
  return _handler(req, res, {
    public: './docs'
  })
})

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
  })
}
