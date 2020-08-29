module.exports = async function () {
	console.log('start global teardown');
	const connection = global.connection;

	console.log('try close connection');
	await connection.close();

	console.log('success to close connection');
};
