import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost', {
			user: 'root',
			pass: 'root',
		}),
	],
})
export class GlobalMongooseModule {}
