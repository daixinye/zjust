const fetchHTML = require('./fetchHTML')

function urlCreator (id, page = 1) {
  if (!id) {
    throw Error('expect id')
  }
  return `http://regi.zju.edu.cn/redir.php?catalog_id=6&cmd=learning&tikubh=${id}&page=${page}`
}

function fetchShiti (id, page) {
  console.log(`正在获取 ${id} 类目, 第 ${page} 页的试题...`)
  return new Promise((resolve, reject) => {
    let url = urlCreator(id, page)

    fetchHTML(url)
      .then(resolve)
      .catch(reject)
  })
}

function fetchShitiById (id) {
  if (!id) {
    return new Promise((resolve, reject) => {
      reject(new Error(-1))
    })
  }

  let questions = []
  let answers = []
  let curPage = 1

  return new Promise(function (resolve, reject) {
    let handler = function ($) {
      // 终止条件
      let isEnd = !$('.shiti').html()
      if (isEnd) {
        console.log(`已获取 ${id} 类目下所有试题`)
        return resolve({
          questions,
          answers
        })
      }

      $('.shiti h3').each((index, elem) => {
        questions.push($(elem).text())
      })

      $('.shiti ~ span').each((index, elem) => {
        answers.push(
          $(elem)
            .text()
            .replace(/(\t|\s)/g, '')
        )
      })

      fetchShiti(id, ++curPage).then(handler)
    }

    fetchShiti(id, curPage).then(handler)
  })
}

module.exports = {
  urlCreator,
  fetchShiti,
  fetchShitiById
}
