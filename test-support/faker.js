const { randomBytes, randomUUID } = require('node:crypto')

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function alpha(length = 1) {
	let value = ''
	const bytes = randomBytes(length)

	for (let index = 0; index < length; index += 1) {
		value += ALPHABET[bytes[index] % ALPHABET.length]
	}

	return value
}

function email() {
	return `test.${randomUUID()}@example.com`
}

module.exports = {
	faker: {
		string: {
			alpha,
			uuid: randomUUID,
		},
		internet: {
			email,
		},
	},
}
