import { Module } from '@nestjs/common';
import { CustomLoggerService } from './CustomLogger.service';

@Module({
	providers: [CustomLoggerService],
	exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
