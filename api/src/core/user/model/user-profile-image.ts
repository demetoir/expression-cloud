import { Entity, JoinColumn, OneToOne } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../common';
import { Image } from '../../image';

@Entity()
export class UserProfileImage {
	@IdField()
	@PkColumn()
	id: number;

	@CreatedAtField()
	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtField()
	@DeletedAtColumn()
	deletedAt: Date;

	@OneToOne(() => Image, (object) => object.userProfile)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: Image;

	// @OneToOne(() => User, (object) => object.profileImage)
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
