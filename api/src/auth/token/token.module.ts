import { Module } from '@nestjs/common';
import { LocalTokenStorageService } from './local-token-storage.service';

@Module({
	providers: [LocalTokenStorageService],
	exports: [LocalTokenStorageService],
})
export class TokenModule {}
