import { InjectableOptions } from '@nestjs/common/decorators/core/injectable.decorator';
import { Injectable, Scope } from '@nestjs/common';

export function DataloaderService(options?: InjectableOptions): ClassDecorator {
	return Injectable({ scope: Scope.REQUEST, ...options });
}
