import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { Module } from '@nestjs/common';

export interface ResolverModuleOptions {
	resolver: Provider;
	imports: Array<
		Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
	>;
}

export function ResolverModule(options: ResolverModuleOptions): ClassDecorator {
	return Module({
		imports: options.imports,
		providers: [options.resolver],
		exports: [options.resolver],
	});
}
