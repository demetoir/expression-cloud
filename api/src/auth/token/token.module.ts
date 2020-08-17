import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';
import { GlobalMongooseModule } from '../../database/GlobalMongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenPayload, TokenPayloadSchema } from './token-payload';

@Module({
	imports: [
		GlobalMongooseModule,
		MongooseModule.forFeature([
			{ name: TokenPayload.name, schema: TokenPayloadSchema },
		]),
	],
	providers: [LocalStorageService, TokenService],
	exports: [LocalStorageService],
})
export class TokenModule {}
