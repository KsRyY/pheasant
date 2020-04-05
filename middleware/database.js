const level = require('level')
const sub = require('subleveldown')

// Main database
const db = level('pheasant-data')

/**
 * This is the sublevel that stores the user posts. The key is the id of the post. The id is a hashesd combination of author + time + post contnent. The value is the post object. Its structure are as follow:
 * ```typescript
 * interface Post {
 *   author: string
 *   contnent: string
 *   pubDate: Date
 *   channel: string
 *   id: string
 * }
 * ```
 */
const posts = sub(db, 'posts', { valueEncoding: 'json' })

/**
 * This is a sublevel that stores user informations. The key is the id of the user (SHA-256 hashed email address). The value is the user object. Its structure are as follow:
 * ```typescript
 * interface User {
 *   email: string
 *   password: string // This is the salted password hash, using the SHA-256 algorithm
 *   token: string
 * }
 * ```
 */
const users = sub(db, 'users', { valueEncoding: 'json' })

module.exports = {
  posts,
  users
}
