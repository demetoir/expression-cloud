import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { VectorEntity } from './vector.entity';
import { AbstractBaseEntity } from './abstractBase.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';
import { ExpressionSettingEntity } from './expressionSetting.entity';
import { ExpressionThumbnailImageEntity } from './expressionThumbnailImage.entity';

@Entity({ name: 'expressions' })
export class ExpressionEntity extends AbstractBaseEntity {
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
	thumbnailImage: ExpressionThumbnailImageEntity;

	@ManyToOne(() => UserEntity, (user) => user.expressions)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;

	@ManyToOne(() => ExpressionEntity)
	@JoinColumn({
		name: 'origin_id',
		referencedColumnName: 'id',
	})
	forkedFrom: ExpressionEntity;

	@ManyToMany(() => UserEntity, (user) => user.likeToExpressions)
	@JoinTable({
		name: 'expression_likes',
		joinColumn: {
			name: 'to_expression_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
	})
	likeFrom: UserEntity[];
}
