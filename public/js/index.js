setTimeout(() => {
  $.ajax({
    url: '/user.action',
    methods: 'get',
    success: function (data) {
      data = JSON.parse(data)
      const liStr = data.map(e=>{
        return `<li>${e}</li>`
      }).join('')
      $('#root').html(liStr)
    },
    error: function (err) {
      console.log('error', err)
    }
  })
}, 1000);
