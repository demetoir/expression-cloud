import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from "typeorm";

import {UserEntity} from "./model/entity/user.entity";


import ormconfig from "../ormconfig.js"


createConnection(ormconfig).then(async connection => {
  console.log('here');;


  const photo = new UserEntity();
  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.email ="email";
  await connection.manager.save(photo);


  const userRepository = connection.getRepository(UserEntity);

 const result =  await   userRepository.find();
 console.log(result);


  console.log("Photo has been saved");

  // todo test one to one
  // todo test many to many
  // todo test one to many

  process.exit(0)
}).catch(error => console.log(error));



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
// bootstrap();
