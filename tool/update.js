'use strict'
const _fs = require('fs')
const _path = require('path')

const { fetchShitiById } = require('../src/shiti')

const IDs = [1436, 1467, 1471, 1484, 1485, 1486]
const PATH_ROOT = _path.join(__dirname, '../doc')

function saveData (root, data) {
  let filename = 'data.json'
  let path = _path.join(root, filename)
  _fs.writeFile(path, JSON.stringify(data), err => {
    if (err) {
      throw err
    } else {
      console.log(`数据已写入至 ${filename}`)
    }
  })
}

function main () {
  let ids = Array.apply(null, IDs)
  let questions = []
  let answers = []

  void (function handler (data = {}) {
    questions = questions.concat(data.questions || [])
    answers = answers.concat(data.answers || [])

    fetchShitiById(ids.pop())
      .then(handler)
      .catch(err => {
        if (err) {
          saveData(PATH_ROOT, {
            questions,
            answers
          })
        }
      })
  })()
}

if (require.main === module) {
  main()
}
