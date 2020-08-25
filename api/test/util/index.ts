import { serialize } from 'class-transformer';

export function entityToResponse(entity) {
	return JSON.parse(serialize(entity));
}
