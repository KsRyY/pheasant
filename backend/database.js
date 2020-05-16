const level = require('level')
const sub = require('subleveldown')

// Main database
const db = level('pheasant-data')

/**
 * This is the sublevel that stores the user posts. The key is the id of the post. The id is a hashesd combination of author + time + post contnent. The value is the post object. Its structure are as follow:
 * ```typescript
 * interface Post {
 *   author: string // The id of the author
 *   contnent: string
 *   pubDate: Date
 *   channel: string
 *   id: string
 * }
 * ```
 */
const posts = sub(db, 'posts', { valueEncoding: 'json' })
const postIdx = {
  author: sub(db, 'postAuthors', { valueEncoding: 'json' }),
  channel: sub(db, 'postChannels', { valueEncoding: 'json' })
}

posts.on('put', (_key, value) => {
  const postAuthor = value.author
  postIdx.author.get(postAuthor, (error, idxValue) => {
    if (error) {
      if (error.notFound) {
        postIdx.author.put(postAuthor, [value], error => {
          if (error) throw error
        })
      } else throw error
    }

    idxValue.push(value)

    postIdx.author.put(postAuthor, idxValue, error => {
      if (error) throw error
    })
  })
})

posts.on('put', (_key, value) => {
  const postChannel = value.channel
  postIdx.channel.get(postChannel, (error, idxValue) => {
    if (error) {
      if (error.notFound) {
        postIdx.channel.put(postChannel, [value], error => {
          if (error) throw error
        })
      } else throw error
    }

    idxValue.push(value)

    postIdx.channel.put(postChannel, idxValue, error => {
      if (error) throw error
    })
  })
})

/**
 * This is a sublevel that stores user informations. The key is the id of the user (SHA-256 hashed email address). The value is the user object. Its structure are as follow:
 * ```typescript
 * interface User {
 *   username: string
 *   email: string
 *   displayName: string
 *   password: string // This is the salted password hash, using the SHA-256 algorithm
 *   token: string // This is the login token which is an randomly generated string
 * }
 * ```
 */
const users = sub(db, 'users', { valueEncoding: 'json' })

const tokens = sub(db, 'tokens', { valueEncoding: 'json' })
const tokenIdx = {
  email: sub(db, 'tokenEmail', { valueEncoding: 'json' }),
  username: sub(db, 'tokenUsername', { valueEncoding: 'json' })
}

tokens.on('put', (_key, value) => {
  const tokenEmail = value.email
  tokenIdx.email.get(tokenEmail, (error, idxValue) => {
    if (error) {
      if (error.notFound) {
        tokenIdx.email.put(tokenEmail, [value], error => {
          if (error) throw error
        })
      } else throw error
    }

    idxValue.push(value)

    tokenIdx.email.put(tokenEmail, idxValue, error => {
      if (error) throw error
    })
  })
})

tokens.on('put', (_key, value) => {
  const tokenUsername = value.username
  tokenIdx.username.get(tokenUsername, (error, idxValue) => {
    if (error) {
      if (error.notFound) {
        tokenIdx.username.put(tokenUsername, [value], error => {
          if (error) throw error
        })
      } else throw error
    }

    idxValue.push(value)

    tokenIdx.username.put(tokenUsername, idxValue, error => {
      if (error) throw error
    })
  })
})

tokens.byEmail = postIdx.email
tokens.byUsername = postIdx.username

module.exports = {
  posts,
  users,
  tokens
}
