import { ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { documentBuilderSingleton } from './documentBuilder.singleton';

export interface ApiAddTagOptions {
	name: string;
	description: string;
}

const _ApiAddTag = ({ name, description }: ApiAddTagOptions) => {
	documentBuilderSingleton.addTag(name, description);

	return function classDecorator<T extends { new (...args: any[]): {} }>(
		constructor: T,
	) {
		return class extends constructor {};
	};
};

export const ApiAddTag = ({ name, description }: ApiAddTagOptions) => {
	return applyDecorators(_ApiAddTag({ name, description }), ApiTags(name));
};
