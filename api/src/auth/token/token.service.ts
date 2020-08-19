import { Injectable } from '@nestjs/common';
import { ITokenService } from './interface';
import { LocalStorageService } from './local-storage.service';
import { IPayload } from '../double-jwt/interface';

@Injectable()
export class TokenService implements ITokenService {
	constructor(private readonly localStorageService: LocalStorageService) {}

	async createOne(payload: IPayload, uuid: string): Promise<void> {
		await this.localStorageService.save(payload, uuid);
	}

	async deleteOne(uuid: string): Promise<void> {
		await this.localStorageService.delete(uuid);
	}

	async findOne(uuid: string): Promise<IPayload> {
		return this.localStorageService.find(uuid);
	}
}
