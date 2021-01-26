import { Directive } from '@nestjs/graphql';
import { RoleName } from 'src/security/role';

export const HasRole = (
	...roleNames: RoleName[]
): MethodDecorator & PropertyDecorator & ClassDecorator =>
	Directive(`@hasRole(requires: [${roleNames.join(', ')}])`);
