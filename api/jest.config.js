module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	rootDir: '.',
	testRegex: '.spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	testTimeout: 30000,
	maxConcurrency: 1,
	maxWorkers: 1,
	globalSetup: './jest.setup.js',
	globalTeardown: './jest.teardown.js',
};
