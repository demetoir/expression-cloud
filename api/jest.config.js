module.exports = {
	globalSetup: './jest.setup.js',
	globalTeardown: './jest.teardown.js',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testTimeout: 30000,
	maxConcurrency: 1,
	maxWorkers: 1,
};
