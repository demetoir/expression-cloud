module.exports = async function () {
	console.log('start global teardown');
	const connection = global.connection;

	if (connection) {
		console.log('try close connection');

		await connection.close();
	}

	console.log('success to close connection');
};
