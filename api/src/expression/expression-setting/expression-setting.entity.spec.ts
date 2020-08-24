import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { ExpressionSettingEntity } from './expression-setting.entity';
import { ExpressionEntity } from '../expression/expression.entity';
import { ormConfig } from '../../common/model/configLoader';

describe('ExpressionSetting entity', () => {
	let expressionSettingRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		await connection.synchronize();

		expressionSettingRepository = connection.getRepository(
			ExpressionSettingEntity,
		);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(expressionSettingRepository);
	});

	it('should create new entity', async function () {
		const setting = new ExpressionSettingEntity();
		await connection.manager.save(setting);

		const result = await expressionSettingRepository.findOne({
			id: setting.id,
		});

		assert.isNotNull(result);
	});

	describe('column type check', () => {
		it('should not null at isPublic', async () => {
			try {
				const setting = new ExpressionSettingEntity();
				setting.isLocked = false;
				setting.isPublic = null;

				await connection.manager.save(setting);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expression_settings.is_public',
				);
			}
		});

		it('should not null at isLocked', async () => {
			try {
				const setting = new ExpressionSettingEntity();
				setting.isLocked = null;
				setting.isPublic = false;

				await connection.manager.save(setting);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expression_settings.is_locked',
				);
			}
		});
	});

	describe('relation', () => {
		let expressionSetting;

		it('should prepare projectSetting', async () => {
			expressionSetting = new ExpressionSettingEntity();

			expressionSetting.name = 'setting';

			await connection.manager.save(expressionSetting);
		});

		it('should relate with expression entity', async () => {
			const expression = new ExpressionEntity();
			expression.type = 1;
			expression.content = 'content';
			expression.description = 'description';
			expression.name = 'tab';
			await connection.manager.save(expression);

			expression.setting = expressionSetting;
			await connection.manager.save(expression);

			expressionSetting.expression = expression;
			await connection.manager.save(expression);

			const result = await expressionSettingRepository.findOne({
				where: { id: expressionSetting.id },
				relations: ['expression'],
			});

			assert.equal(result.expression.id, expression.id);
		});
	});
});
