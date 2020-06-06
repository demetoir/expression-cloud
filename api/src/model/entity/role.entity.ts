import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name:'roles'})
export class RoleEntity {
  @PrimaryGeneratedColumn('increment',{ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @ManyToMany(type => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
