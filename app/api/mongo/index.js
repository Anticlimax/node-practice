// 创建model

const {blogSchema, categorySchema} = require('./schema')
const mongoose = require('mongoose')

const BlogModel = mongoose.model('Blog', blogSchema)
const CategorySchema = mongoose.model('Category', categorySchema)

const $_saveBlog = blog => {
  return BlogModel.findOneAndUpdate({
    title: blog.title
  }, blog, {upsert: true})
    .exec()
    .then(_blog => {
      return {status: 1, data: _blog}
    })
}

const $_saveCategory = category => {
  console.log(category)
  return CategorySchema.findOneAndUpdate({
    name: category.name
  }, category).then(_category => {
    return {status: 1, data: _category}
  })
}

module.exports = {
  $_saveBlog,
  $_saveCategory
}