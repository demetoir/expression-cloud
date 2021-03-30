import { registerEnumType } from '@nestjs/graphql';
import { RoleName } from '../../user';

registerEnumType(RoleName, {
	name: 'RoleName',
});
