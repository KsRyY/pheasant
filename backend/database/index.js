const level = require('level')
const sublevel = require('subleveldown')
const os = require('os')
const path = require('path')

// Open a database for storage, default path is `~/.pheasant/db`
const database = level(path.join(os.homedir(), '.pheasant', 'db'), {
    // encode value using JSON
    valueEncoding: 'json'
})