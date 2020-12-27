import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStorageService {
	public readonly storage: any;

	constructor() {
		this.storage = {};
	}

	public async save(obj: any, key: string): Promise<void> {
		if (key in this.storage) {
			throw new Error(`obj already exist of ${key}`);
		}

		this.storage[key] = obj;
	}

	public async find(key): Promise<any> {
		if (!(key in this.storage)) {
			return null;
		}

		return this.storage[key];
	}

	public async delete(key: string): Promise<void> {
		if (!(key in this.storage)) {
			throw new Error(`not exist obj of ${key}`);
		}
		delete this.storage[key];
	}
}
