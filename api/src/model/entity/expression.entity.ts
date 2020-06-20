import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';
import { ColumnEntity } from './column.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'expressions' })
export class ExpressionEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'type', type: 'tinyint', nullable: false })
	type: number;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	// todo 이거 마이그레이션에서 column name content 에서 description 으로 수정
	@Column({ name: 'content', type: 'text', nullable: false })
	description: string;

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

	@ManyToOne(() => ProjectEntity, (project) => project.expressions)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	project: ProjectEntity;

	@OneToMany(() => ColumnEntity, (column) => column.expression)
	columns: ColumnEntity[];
}
