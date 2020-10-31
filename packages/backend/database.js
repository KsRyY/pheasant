const level = require('level')
const sublevel = require('subleveldown')
const os = require('os')
const path = require('path')
const encrypt = require('./encrypt')

// Open a database for storage, default path is `~/.pheasant/db`
const database = level(path.join(os.homedir(), '.pheasant', 'db'), {
	// Encode value using JSON
	valueEncoding: 'json'
})

/* Create a sublevel for storing user information.
 * The key is each users' unique ID (refer to the `getUniqueId` method defined in encrypt.js)
 * The value conforms to the following format:
 * ```
 * {
 *   username: string,
 *   nickname: string
 *   email: string
 * }
 * ```
 */
const users = sublevel(database, 'users', {
	valueEncoding: 'json'
})

module.export = { database, users }
