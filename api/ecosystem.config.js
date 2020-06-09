module.exports = {
	apps : [{
		name: "api server",
		script: "./dist/main.js",
		env: {
			NODE_ENV: "production",
		},
		env_production: {
			NODE_ENV: "production",
		}
	}]
}
