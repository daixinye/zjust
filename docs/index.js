void (function () {
  var shitis = null

  window.onload = function () {
    var xhr = new window.XMLHttpRequest()
    xhr.open('GET', './data.json', true)
    xhr.send()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        shitis = JSON.parse(xhr.response)
      }
    }
  }

  window.handleSearch = function () {
    var $keyword = document.querySelector('#keyword')
    var keyword = $keyword.value
    $keyword.value = ''
    $keyword.focus()

    var questions = shitis.questions || []
    var answers = shitis.answers || []
    var qas = []

    questions.forEach(function (question, index) {
      if (question.match(new RegExp(keyword, 'g'))) {
        question = question.replace(
          new RegExp(keyword, 'g'),
          ['<mark>', keyword, '</mark>'].join('')
        )
        qas.push({
          question: question,
          answer: answers[index]
        })
      }
    })

    window.clearQA()
    window.printQA(qas)
  }

  window.printQA = function (qas) {
    var $result = document.querySelector('#result')
    if (!$result) {
      throw Error('#result not found')
    }

    qas.forEach(function (item) {
      var li = document.createElement('li')
      li.innerHTML = item.question + item.answer
      $result.appendChild(li)
    })
  }

  window.clearQA = function () {
    var $result = document.querySelector('#result')
    if (!$result) {
      throw Error('#result not found')
    }

    $result.innerHTML = ''
  }
})()
