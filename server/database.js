const level = require('level')
const autoIndex = require('level-auto-index')
const sub = require('subleveldown')

const db = level('pheasant-data')

const posts = sub(db, 'posts', { valueEncoding: 'json' })
const index = {
  contnent: sub(db, 'contnent'),
  channel: sub(db, 'channel'),
  id: sub(db, 'id'),
  author: sub(db, 'author')
}

posts.byContnent = autoIndex(posts, index.contnent, post => post.contnent)
posts.byChannel = autoIndex(posts, index.channel, post => post.channel)
posts.byId = autoIndex(posts, index.id, post => post.id)
posts.byAuthor = autoIndex(posts, index.author, post => post.author)

const users = sub(db, 'users', { valueEncoding: 'json' })

module.exports = {
  posts,
  users
}
