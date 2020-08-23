import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';

@Module({
	providers: [LocalStorageService, TokenService],
	exports: [TokenService],
})
export class TokenModule {}
