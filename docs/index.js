void (function () {
  window.onload = function () {
    var app = new App()
    app.start()
  }

  function App () {
    // 初始化变量
    var _nodes = new Nodes()
    var _views = new Views()
    this.shitis = null

    // 初始化方法
    this.onSearch = function () {
      var $keyword = _nodes.$keyword
      var keyword = $keyword.value
      $keyword.value = ''
      $keyword.focus()

      if (!keyword) {
        return
      }

      var questions = this.shitis.questions || []
      var answers = this.shitis.answers || []
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

      _views.result.clear()
      _views.result.print(qas)
    }

    this.fetchData = function () {
      var xhr = new window.XMLHttpRequest()
      xhr.open('GET', './data.json', true)
      xhr.send()

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          this.onLoaded(xhr.response)
          this.shitis = JSON.parse(res)
        }
      }.bind(this)
    }

    this.bindEvent = function () {
      _nodes.$button.addEventListener('click', this.onSearch)
    }

    // 启动App
    this.start = function () {
      // 获取数据
      this.fetchData()
      // 绑定事件
      this.bindEvent()
    }
  }

  function Nodes () {
    this.$result = document.querySelector('#result')
    this.$button = document.querySelector('#button')
    this.$keyword = document.querySelector('#keyword')
  }

  function Views () {
    var _nodes = new Nodes()

    this.button = {
      disable: function () {
        _nodes.$button.setAttribute('disabled', 'disabled')
      },
      enable: function () {
        _nodes.$button.setAttribute('disabled', '')
      }
    }
    this.result = {
      print: function (qas) {
        var $result = document.querySelector('#result')
        if (!$result) {
          throw Error('#result not found')
        }

        qas.forEach(function (item) {
          var li = document.createElement('li')
          li.innerHTML = item.question + item.answer
          $result.appendChild(li)
        })
      },
      clear: function () {
        var $result = document.querySelector('#result')
        if (!$result) {
          throw Error('#result not found')
        }

        $result.innerHTML = ''
      }
    }
  }
})()
