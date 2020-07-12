import { Module } from '@nestjs/common';
import { ScalarController } from './scalar.controller';
import { ScalarService } from './scalar.service';

@Module({
	controllers: [ScalarController],
	providers: [ScalarService],
})
export class ScalarModule {}
