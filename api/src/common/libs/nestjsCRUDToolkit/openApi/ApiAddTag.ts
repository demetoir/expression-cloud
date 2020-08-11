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

/**
 * controller class decorate 하면 바로다 tag name, description, controller 지정한
 *
 * @param name
 * @param description
 * @constructor
 */
export const ApiAddTag = ({ name, description }: ApiAddTagOptions) => {
	// _ApiAddTag tag 이름과 설명을 추가만 한다.
	// ApiTag는 컨트롤러에 tag 지정 및 이름 설정 만한다.
	// 둘다 해주어야 데코레이터가 적용될 컨트롤러와 tag name, description 모두 적용된다

	return applyDecorators(_ApiAddTag({ name, description }), ApiTags(name));
};
