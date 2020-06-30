import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { ExpressionSettingEntity } from './expressionSetting.entity';

describe('projectSetting entity', () => {
	let projectSettingRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		projectSettingRepository = connection.getRepository(
			ExpressionSettingEntity,
		);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(projectSettingRepository);
	});

	it('should create new entity', async function () {
		const role = new ExpressionSettingEntity();
		await connection.manager.save(role);

		const newTeam = await projectSettingRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	describe('relation', () => {
		let projectSetting;

		it('should prepare projectSetting', async () => {
			projectSetting = new ExpressionSettingEntity();

			projectSetting.name = 'projectSetting';

			await connection.manager.save(projectSetting);
		});
	});
});
