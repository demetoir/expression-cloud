import { Module } from '@nestjs/common';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';

@Module({
	controllers: [UserCRUDController],
	providers: [UserCRUDService],
})
export class UserModule {}
