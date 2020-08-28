import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { TeamEntity } from './team.entity';
import { ormConfig } from '../common/model/configLoader';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import { UserFactory } from '../../test/user/user/user.factory';

describe('team entity', () => {
	let connection;
	let teamRepository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		teamRepository = connection.getRepository(TeamEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(teamRepository);
	});

	it('should create new entity', async function () {
		const team = new TeamEntity();
		team.name = 'team name';
		team.description = 'description';
		await connection.manager.save(team);

		const newTeam = await teamRepository.findOne({ id: team.id });

		assert.isNotNull(newTeam);
	});

	describe('check column type', () => {
		it('should not null on name', async function () {
			try {
				const name = undefined;
				const description = 'description ';

				const team = new TeamEntity();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"ER_NO_DEFAULT_FOR_FIELD: Field 'name' doesn't have a default value",
				);
			}
		});

		it('should not null on  description', async function () {
			try {
				const name = 'Me and Bears';
				const description = undefined;

				const team = new TeamEntity();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);
				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"ER_NO_DEFAULT_FOR_FIELD: Field 'description' doesn't have a default value",
				);
			}
		});
	});

	describe('relation', () => {
		let team;

		it('should prepare team', async () => {
			team = new TeamEntity();

			team.name = 'team';
			team.description = 'description';

			await connection.manager.save(team);
		});

		it('should relate with user entity', async () => {
			const user = UserFactory.build();
			await connection.manager.save(user);

			user.teams = [team];
			team.users = [user];

			await connection.manager.save(user);
			await connection.manager.save(team);

			const resultTeam = await teamRepository.findOne({
				where: { id: team.id },
				relations: ['users'],
			});
			await connection.manager.save(resultTeam);

			assert.equal(resultTeam.users[0].id, user.id);
		});
	});
});
