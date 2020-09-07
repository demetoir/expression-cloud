// eslint-disable-next-line @typescript-eslint/no-var-requires
// const ormConfig = require('../../../ormconfig.js');

import { entities } from './entity';

export const config = {
	entities,
	migrations: [],
	subscribers: [],
};
