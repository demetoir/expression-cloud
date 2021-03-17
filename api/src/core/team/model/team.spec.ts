import { assert } from 'chai';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { getConnectionForTest } from 'test/util/typeorm';
import { Connection, Repository } from 'typeorm';
import { Team } from './team';

const database = 'team_entity';
describe('team entity', () => {
	let connection: Connection;
	let teamRepository: Repository<Team>;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		teamRepository = connection.getRepository(Team);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(teamRepository);
	});

	it('should create new entity', async () => {
		const team = new Team();
		team.name = 'team name';
		team.description = 'description';
		await connection.manager.save(team);

		const newTeam = await teamRepository.findOne({ id: team.id });

		assert.isNotNull(newTeam);
	});

	describe('check column type', () => {
		it('should not null on name', async () => {
			try {
				const name = undefined;
				const description = 'description ';

				const team = new Team();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"Field 'name' doesn't have a default value",
				);
			}
		});

		it('should not null on  description', async () => {
			try {
				const name = 'Me and Bears';
				const description = undefined;

				const team = new Team();
				team.name = name;
				team.description = description;
				await connection.manager.save(team);
				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"Field 'description' doesn't have a default value",
				);
			}
		});
	});

	// describe('relation', () => {
	// 	let team;
	//
	// 	it('should prepare team', async () => {
	// 		team = new TeamEntity();
	//
	// 		team.name = 'team';
	// 		team.description = 'description';
	//
	// 		await connection.manager.save(team);
	// 	});
	//
	// 	it('should relate with user entity', async () => {
	// 		const user = UserFactory.build();
	// 		await connection.manager.save(user);
	//
	// 		user.teams = [team];
	// 		team.users = [user];
	//
	// 		await connection.manager.save(user);
	// 		await connection.manager.save(team);
	//
	// 		const resultTeam = await teamRepository.findOne({
	// 			where: { id: team.id },
	// 			relations: ['users'],
	// 		});
	// 		await connection.manager.save(resultTeam);
	//
	// 		assert.equal(resultTeam.users[0].id, user.id);
	// 	});
	// });
});
