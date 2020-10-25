import { prepareDatabaseSchema } from './util/typeorm';

module.exports = async () => {
	await prepareDatabaseSchema();
};
