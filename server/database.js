const level = require('level')
const sub = require('subleveldown')

// Main database
const db = level('pheasant-data')

/**
 * This is the sub database that stores the user posts. The key is the id of the post. The id is a hashesd combination of author + time + post contnent. The value is the post object. Its structure are as follow:
 * ```typescript
 * interface Post {
 *   author: string,
 *   contnent: string,
 *   pubDate: Date,
 *   channel: string,
 *   id: string
 * }
 * ```
 */
const posts = sub(db, 'posts', { valueEncoding: 'json' })

// Sub database for storing user information
const users = sub(db, 'users', { valueEncoding: 'json' })

// Sub database for storing user auth tokens
const tokens = sub(db, 'tokens', { valueEncoding: 'json' })

module.exports = {
  posts,
  users,
  tokens
}
