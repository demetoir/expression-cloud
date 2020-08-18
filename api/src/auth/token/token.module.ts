import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';
import { GlobalMongooseModule } from '../../database/GlobalMongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenDocument, TokenPayloadSchema } from './token.document';

@Module({
	imports: [
		GlobalMongooseModule,
		MongooseModule.forFeature([
			{ name: TokenDocument.name, schema: TokenPayloadSchema },
		]),
	],
	providers: [LocalStorageService, TokenService],
	exports: [LocalStorageService],
})
export class TokenModule {}
