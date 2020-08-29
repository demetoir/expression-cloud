module.exports = async () => {
	const connection = global.connection;
	await connection.close();
};
