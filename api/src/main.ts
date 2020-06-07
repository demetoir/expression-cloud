import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'typeorm';

import { UserEntity } from './model/entity/user.entity';

import ormconfig from '../ormconfig.js';
import { UserSettingEntity } from './model/entity/userSetting.entity';
import { RoleEntity } from './model/entity/role.entity';
import { setFlagsFromString } from 'v8';
import { NoticeEntity } from "./model/entity/notices.entity";
import { getNonTransientInstances } from "@nestjs/core/injector/transient-instances";

createConnection(ormconfig)
	.then(async connection => {
		console.log('here');
		const user = new UserEntity();
		user.name = 'Me and Bears';
		user.description = 'I am near polar bears';
		user.email = 'email';
		await connection.manager.save(user);

		const userRepository = connection.getRepository(UserEntity);
		const userSettingRepository = connection.getRepository(
			UserSettingEntity,
		);
		const roleRepository = connection.getRepository(RoleEntity);
		const noticeRepository = connection.getRepository(NoticeEntity);

		const result = await userRepository.find();
		console.log(result);

		console.log('Photo has been saved');


		const userSetting = new UserSettingEntity();
		userSetting.user = Promise.resolve(user);
		await connection.manager.save(userSetting);

		user.setting = Promise.resolve(userSetting);
		await connection.manager.save(user);

		const result1 = await userRepository.findOne({ id: user.id });
		console.log(result1);
		console.log(await result1.setting);

		const result2 = await userSettingRepository.find();
		console.log(result2);

		const adminRole = new RoleEntity();
		adminRole.name = 'admin';
		await connection.manager.save(adminRole);

		const userRole = new RoleEntity();
		userRole.name = 'user';
		await connection.manager.save(userRole);

		user.roles = [adminRole, userRole];
		await connection.manager.save(user);

		const result3 = await userRepository.findOne({ id: user.id });
		console.log(result3);


		const notice1 = new NoticeEntity();
		notice1.content = "content";
		// notice1.user = user
		await connection.manager.save(notice1);


		const notice2 = new NoticeEntity();
		notice2.content =" contesnt";
		notice2.user = user;
		await connection.manager.save(notice2);

		console.log('fwesfsef')

		console.log(user);

		const result6 = await userRepository.find({relations:["notices"]})
		console.log(result6)

		const result5 = await userRepository.createQueryBuilder('user').leftJoin('user.notices', 'notice').getMany();
		console.log(result5);


		process.exit(0);
	})
	.catch(error => {
		console.log(error);
		process.exit(0);
	});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
}

// bootstrap();
