// 创建schema

const {Schema} = require('mongoose')

// 创建博客的数据存储
exports.blogSchema = new Schema({
  title: String,
  content: String,
  rawContent: String,
  category: String,
  date: {
    type: String,
    default: () => {
      return new Date().toLocaleString()
    }
  }
})

// 创建博客分类
exports.categorySchema = new Schema({
  category: String
})