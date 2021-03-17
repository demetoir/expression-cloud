import { internet, lorem, random, system } from 'faker';
import { Image } from './image';

export class ImageFactory {
	static build(): Image {
		const entity = new Image();
		entity.url = internet.url();
		entity.extension = '.jpg';
		entity.fileName = lorem.sentence();
		entity.path = system.directoryPath();
		entity.type = random.number();

		return entity;
	}
}
