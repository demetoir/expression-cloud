import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloResolver } from './hello.resolver';

@Module({
	controllers: [HelloController],
	providers: [HelloResolver],
})
export class HelloModule {}
