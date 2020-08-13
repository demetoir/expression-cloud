import { Module } from '@nestjs/common';
import { TokenStorageService } from './tokenStorage.service';

@Module({
	providers: [TokenStorageService],
	exports: [TokenStorageService],
})
export class TokenModule {}
