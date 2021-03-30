import { Directive } from '@nestjs/graphql';
import { RoleName } from '../../user';

export const HasRole = (
	...roleNames: RoleName[]
): MethodDecorator & PropertyDecorator & ClassDecorator =>
	Directive(`@hasRole(requires: [${roleNames.join(', ')}])`);
