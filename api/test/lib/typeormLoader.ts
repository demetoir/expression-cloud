import { createConnection } from 'typeorm';
import * as config from '../../ormconfig.js';
import uuid from 'uuid';

export class TypeormLoader {
	private connection: any;
	private readonly scope: string;

	constructor(scope = uuid.v4()) {
		this.scope = scope;
	}

	async openConnection(): Promise<void> {
		this.connection = await createConnection({
			...config,
			database: this.scope,
		});

		return await this.connection.synchronize();
	}

	async closeConnection(): Promise<void> {
		return await this.connection.close();
	}
}
