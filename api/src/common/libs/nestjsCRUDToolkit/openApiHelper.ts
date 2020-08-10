import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerUIHelper {
	public readonly swaggerDocumentBuilder: DocumentBuilder;

	constructor() {
		this.swaggerDocumentBuilder = new DocumentBuilder();
	}

	get documentBuilder(): DocumentBuilder {
		return this.swaggerDocumentBuilder;
	}

	setup(app: INestApplication, path = '/docs'): void {
		const options = this.swaggerDocumentBuilder.build();
		const document = SwaggerModule.createDocument(app, options);

		SwaggerModule.setup(path, app, document);
	}
}

export const swaggerHelperSingleton: SwaggerUIHelper = new SwaggerUIHelper();
