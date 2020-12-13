import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { VectorEntity } from 'src/vector/vector.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { ExpressionSettingEntity } from '../expression-setting/expression-setting.entity';
import { ExpressionThumbnailImageEntity } from '../expression-thumbnail-image/expression-thumbnail-image.entity';

@Entity({ name: 'expressions' })
export class ExpressionEntity extends BaseEntity {
	@Column({
		name: 'type',
		type: 'tinyint',
		nullable: false,
	})
	type: number;

	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	@Column({
		name: 'content',
		type: 'text',
		nullable: false,
	})
	content: string;

	@Column({
		name: 'description',
		type: 'text',
		nullable: false,
	})
	description: string;

	@Column({
		type: 'integer',
		name: 'like_count',
		nullable: false,
		default: 0,
	})
	likeCount: number;

	@Column({
		type: 'boolean',
		name: 'is_forked',
		nullable: false,
		default: false,
	})
	isForked: boolean;

	@Column({
		type: 'integer',
		name: 'fork_count',
		nullable: false,
		default: 0,
	})
	forkCount: number;

	@OneToMany(() => ExpressionEntity, (expression) => expression.forkedTo)
	forkedTo: ExpressionEntity[];

	@OneToMany(() => VectorEntity, (vector) => vector.expression)
	vectors: VectorEntity[];

	@OneToOne(() => ExpressionSettingEntity, (setting) => setting.expression)
	setting: ExpressionSettingEntity;

	@OneToMany(() => TagEntity, (tags) => tags.expression)
	tags: TagEntity[];

	@OneToOne(
		() => ExpressionThumbnailImageEntity,
		(object) => object.expression,
	)
	thumbnailImage: Promise<ExpressionThumbnailImageEntity>;

	@ManyToOne(() => ExpressionEntity)
	@JoinColumn({
		name: 'origin_id',
		referencedColumnName: 'id',
	})
	forkedFrom: ExpressionEntity;
}
