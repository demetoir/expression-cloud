import { serialize } from 'class-transformer';

export const entityToResponse = (entity: unknown): any =>
	JSON.parse(serialize(entity));
