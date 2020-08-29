import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { ExpressionSettingEntity } from './expression-setting.entity';
import { ormConfig } from '../../common/model/configLoader';
import { ExpressionFactory } from '../expression/expression.factory';
import { expectShouldNotCallThis } from '../../../test/lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';

describe('ExpressionSetting entity', () => {
	let expressionSettingRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

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

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					"ER_BAD_NULL_ERROR: Column 'is_public' cannot be null",
				);
			}
		});

		it('should not null at isLocked', async () => {
			try {
				const setting = new ExpressionSettingEntity();
				setting.isLocked = null;
				setting.isPublic = false;

				await connection.manager.save(setting);
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					"ER_BAD_NULL_ERROR: Column 'is_locked' cannot be null",
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
			const expression = ExpressionFactory.build();
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
