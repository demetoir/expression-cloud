module.exports = {
	globalSetup: './jest.setup.js',
	globalTeardown: './jest.teardown.js',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	"moduleNameMapper": {
		"^src/(.*)$": "<rootDir>/src/$1",
		"^test/(.*)$": "<rootDir>/test/$1"
	},
	testTimeout: 30000,
	maxConcurrency: 1,
	maxWorkers: 1,
};
