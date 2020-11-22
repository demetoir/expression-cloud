import { internet, lorem, random, system } from 'faker';
import { ImageEntity } from './image.entity';

export class ImageFactory {
	static build(): ImageEntity {
		const entity = new ImageEntity();
		entity.url = internet.url();
		entity.extension = '.jpg';
		entity.fileName = lorem.sentence();
		entity.path = system.directoryPath();
		entity.type = random.number();

		return entity;
	}
}
