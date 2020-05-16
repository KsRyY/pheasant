const randomString = require('crypto-random-string')
const sha256 = require('crypto-js/sha256')
const database = require('./database')

async function addUser(username, saltedPassword) {
  return database.users.put(username, { username, password: saltedPassword })
}

async function getUser(email) {
  const id = sha256(email)
  return database.users.get(id)
}

async function login(email, password, token) {
  const user = await getUser(email)
}

module.exports = {
  addUser,
  getUser
}
