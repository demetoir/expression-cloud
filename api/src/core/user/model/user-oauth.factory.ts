import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserOauth } from './user-oauth';

const Entity = UserOauth;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
