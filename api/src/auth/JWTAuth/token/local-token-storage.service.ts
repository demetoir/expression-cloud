import { ITokenStorageService } from './interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalTokenStorageService implements ITokenStorageService {
	private readonly storage: any;

	constructor() {
		this.storage = {};
	}

	public async delete(token: string, tokenUuid: string): Promise<void> {
		if (!(tokenUuid in this.storage)) {
			throw new Error('not exist token');
		}

		if (token !== this.storage[tokenUuid]) {
			throw new Error('token and token in storage is not equal');
		}

		delete this.storage[tokenUuid];
	}

	public async save(token: string, tokenUuid: string): Promise<void> {
		if (tokenUuid in this.storage) {
			throw new Error('token UUid already exist');
		}

		this.storage[tokenUuid] = token;
	}
}
