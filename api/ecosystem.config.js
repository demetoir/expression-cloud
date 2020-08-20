module.exports = {
	apps: [
		{
			name: 'api server',
			script: './dist/main.js',
			env: {
				...process.env,
				is_PM2: true,
			},
			instances: 1,
			exec_mode: 'cluster',
			watch: false,
			max_memory_restart: '250M',
			source_map_support: true,
			autorestart: true,
			listen_timeout: 8000,
			kill_timeout: 3000,
			shutdown_with_message: false,
			wait_ready: false,
			max_restarts: 10,
			restart_delay: 4000,
		},
	],
};
