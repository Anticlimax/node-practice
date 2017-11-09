module.exports = url => {
  let apiMap = {
    '/list.action': ['吉他', '三只松鼠', 'mongodb'],
    '/user.action': ['hello', 'world', 'liyang']
  }
  return apiMap[url]
}