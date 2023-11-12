module.exports = {
	preset: 'ts-jest',
	rootDir: ".",
	testEnvironment: "node",
	testRegex: "^.+/__tests__/.*.test.[jt]s$",
	transform: {
		"^.+\\.ts$": "ts-jest",
	}
}
