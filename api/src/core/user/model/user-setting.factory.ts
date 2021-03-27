import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserSetting } from './user-setting';

const Entity = UserSetting;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
