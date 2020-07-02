// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormConfig = require('../../ormconfig.js');

import { entities } from './entity';
ormConfig.entities = entities;
ormConfig.migrations = [];
ormConfig.subscribers = [];

export const config = {
	...ormConfig,
	entities,
	migrations: [],
	subscribers: [],
};
export { ormConfig };
