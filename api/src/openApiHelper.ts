import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerHelper {
	public readonly swaggerDocumentBuilder: DocumentBuilder;

	constructor() {
		this.swaggerDocumentBuilder = new DocumentBuilder();
	}

	get documentBuilder(): DocumentBuilder {
		return this.swaggerDocumentBuilder;
	}

	setup(app, path = '/docs') {
		const options = this.swaggerDocumentBuilder.build();
		const document = SwaggerModule.createDocument(app, options);

		SwaggerModule.setup(path, app, document);
	}
}

export const swaggerHelperSingleton: SwaggerHelper = new SwaggerHelper();
