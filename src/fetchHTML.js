const _http = require('http')
const _iconv = require('iconv-lite')
const _cheerio = require('cheerio')

const fetchHTML = function (url) {
  let body = ''
  let promise = new Promise((resolve, reject) => {
    _http.get(url, res => {
      res.on('data', chunk => {
        body += _iconv.decode(chunk, 'gb2312')
      })

      res.on('end', () => {
        resolve(_cheerio.load(body))
      })

      res.on('error', err => {
        reject(err)
      })
    })
  })
  return promise
}

module.exports = fetchHTML

if (require.main === module) {
  void (function test () {
    fetchHTML('http://blog.daixinye.com', function ($) {
      console.log($('body').html())
    })
  })()
}
