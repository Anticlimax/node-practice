setTimeout(() => {
  $.ajax({
    url: '/user.action',
    methods: 'get',
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
    methods: 'get',
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
