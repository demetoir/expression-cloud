import { UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { World } from 'src/hello/world';
import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
	Auth,
	CurrentUser,
	JwtGuard,
	RoleName,
	TokenPayload,
} from 'src/security';
import { Hello } from './hello';

@Resolver(() => Hello)
export class HelloResolver {
	@Query(() => Hello, { name: 'queryHello' })
	async queryHello(@CurrentUser() user: TokenPayload<any>): Promise<Hello> {
		const hello = new Hello();
		hello.id = 1;
		hello.name = 'name';

		return hello;
	}

	@Query(() => [Hello], { name: 'queryManyHello' })
	async queryManyHello(): Promise<Hello[]> {
		const hellos = _.range(0, 3).map((x) => {
			const hello = new Hello();
			hello.id = 1;
			hello.name = 'name';

			return hello;
		});

		return hellos;
	}

	@UseGuards(JwtGuard)
	@Query(() => Hello, { name: 'queryLoginOnly' })
	async queryLoginOnly(
		@CurrentUser() user: TokenPayload<any>,
	): Promise<Hello> {
		const hello = new Hello();
		hello.id = 1;
		hello.name = 'login only';

		return hello;
	}

	@Auth(RoleName.user)
	@Query(() => Hello, { name: 'queryLoginUserOnly' })
	async queryLoginUserOnly(
		@CurrentUser() user: TokenPayload<any>,
	): Promise<Hello> {
		// console.log(user);
		const hello = new Hello();
		hello.id = 1;
		hello.name = 'user only';

		return hello;
	}

	@Auth(RoleName.admin)
	@Query(() => Hello, { name: 'queryLoginAdminOnly' })
	async queryLoginAdminOnly(
		@CurrentUser() user: TokenPayload<any>,
	): Promise<Hello> {
		const hello = new Hello();
		hello.id = 1;
		hello.name = 'admin only';

		return hello;
	}

	@ResolveField(() => [World], { name: 'world' })
	async resolveWorld(
		@CurrentUser() user: TokenPayload<any>,
	): Promise<World[]> {
		// console.log(user);
		const world = new World();
		world.id = 1;
		world.name = 'world';

		const world2 = new World();
		world2.id = 1;
		world2.name = 'world2';

		const world3 = new World();
		world3.id = 1;
		world3.name = 'world3';

		return [world, world2, world3];
	}
}
