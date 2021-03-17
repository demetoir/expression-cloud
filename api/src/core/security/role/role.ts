import { registerEnumType } from '@nestjs/graphql';

export class Role {
	id: string;

	name: RoleName;
}

export enum RoleName {
	user = 'user',

	admin = 'admin',
}

registerEnumType(RoleName, {
	name: 'RoleName',
});
