import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as ormConfig } from '../common/model/configLoader';

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig)],
})
export class GlobalTypeOrmModule {}
