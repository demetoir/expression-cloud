import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { TeamEntity } from './team.entity';

describe('team entity', () => {
	let userRepository;
	let connection;
	let teamRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
		teamRepository = connection.getRepository(TeamEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function() {
		assert.isNotNull(userRepository);

		assert.isNotNull(teamRepository);
	});

	it('should create new entity', async function() {
		const team = new TeamEntity();
		team.name = 'team name';
		team.description = 'description';
		await connection.manager.save(team);

		const newTeam = userRepository.findOne({ id: team.id });

		assert.isNotNull(newTeam);
	});

	describe('check column', () => {
		it('should not null on name', async function() {
			try {
				const name = undefined;
				const description = 'description ';

				const team = new TeamEntity();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: teams.name',
				);
			}
		});

		it('should not null on  description', async function() {
			try {
				const name = 'Me and Bears';
				const description = undefined;

				const team = new TeamEntity();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: teams.description',
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
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.teams = [team];
			await connection.manager.save(user);

			team.users = [user];
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
