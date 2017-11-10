setTimeout(() => {
  $.ajax({
    url: '/user.action',
    method: 'get',
    success: function (data) {
      const liStr = data.map(e=>{
        return `<li>${e}</li>`
      }).join('')
      $('#root').html(liStr)
    },
    error: function (err) {
      console.log('error', err)
    }
  })
  $.ajax({
    url: '/list.action',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify([
      'name', 'liyang'
    ]),
    success: function (data) {
      const liStr = data.map(e=>{
        return `<li>${e}</li>`
      }).join('')
      $('#shop').html(liStr)
    },
    error: function (err) {
      console.log('error', err)
    }
  })
}, 1000);
