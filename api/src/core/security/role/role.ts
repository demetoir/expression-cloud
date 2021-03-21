import { registerEnumType } from '@nestjs/graphql';

export enum RoleName {
	user = 'user',

	admin = 'admin',
}

registerEnumType(RoleName, {
	name: 'RoleName',
});
