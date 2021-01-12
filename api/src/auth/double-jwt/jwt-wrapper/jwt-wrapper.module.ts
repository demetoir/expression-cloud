import { JwtModule } from '@nestjs/jwt';
import { DynamicModule, Module } from '@nestjs/common';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { JwtOptionsFactory } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtWrapperService } from './jwt-wrapper.service';

export interface JwtWrapperModuleAsyncOptions
	extends Pick<ModuleMetadata, 'imports'> {
	useClass?: Type<JwtOptionsFactory>;
}

@Module({
	providers: [JwtWrapperService],
	exports: [JwtWrapperService],
})
export class JwtWrapperModule {
	static registerAsync(options: JwtWrapperModuleAsyncOptions): DynamicModule {
		return {
			module: JwtWrapperModule,
			imports: [
				JwtModule.registerAsync({
					useClass: options.useClass,
				}),
			],
		};
	}
}
