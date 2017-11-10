
module.exports = (req) => {
  let {url, method, context} = req
  let apiMap = {
    '/list.action': [
      '吉他', '三只松鼠', 'mongodb'
    ],
    '/user.action': ['hello', 'world', 'liyang']
  }
  method = method.toLowerCase()
  if (method == 'get') {
    return Promise.resolve(apiMap[url])
  } else {
    let {body} = context
    return Promise.resolve(body)
  }
}