import {
	Column,
	Entity,
	JoinColumn,
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
	@Column({ name: 'type', type: 'tinyint', nullable: false })
	type: number;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({ name: 'content', type: 'text', nullable: false })
	content: string;

	@Column({ name: 'description', type: 'text', nullable: false })
	description: string;

	@OneToMany(() => VectorEntity, (vector) => vector.expression)
	vectors: VectorEntity[];

	@OneToOne(() => ExpressionSettingEntity, (setting) => setting.expression)
	setting: ExpressionSettingEntity;

	@OneToMany(() => TagEntity, (tags) => tags.expression)
	tags: TagEntity[];

	// todo add test
	@OneToMany(
		() => ExpressionThumbnailImageEntity,
		(object) => object.expression,
	)
	thumbnailImage: ExpressionThumbnailImageEntity[];

	@ManyToOne(() => UserEntity, (user) => user.expressions)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
