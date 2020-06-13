import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'images' })
export class ImageEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'url', type: 'text', nullable: false })
	url: string;

	@Column({
		name: 'extension',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	extension: string;

	@Column({ name: 'file_name', type: 'text', nullable: false })
	fileName: string;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refId: bigint;

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
}
