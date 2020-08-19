import { Injectable } from '@nestjs/common';
import { ITokenPayload, ITokenService } from './interface';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenService implements ITokenService {
	constructor(private readonly localStorageService: LocalStorageService) {}

	async createOne(payload: ITokenPayload, uuid: string): Promise<void> {
		await this.localStorageService.save(payload, uuid);
	}

	async deleteOne(uuid: string): Promise<void> {
		await this.localStorageService.delete(uuid);
	}

	async findOne(uuid: string): Promise<ITokenPayload> {
		return this.localStorageService.find(uuid);
	}
}
