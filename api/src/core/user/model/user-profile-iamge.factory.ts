import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserProfileImage } from './user-profile-image';

const Entity = UserProfileImage;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
