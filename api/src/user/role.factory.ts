import { IRole } from './role.interface';
import { IUser } from './user.interface';

export class RoleFactory implements IRole {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: string;

	users: IUser[];
}
