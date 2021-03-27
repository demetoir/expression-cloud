import { Entity, JoinColumn, OneToOne } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';
import { Image } from '../../image';

@Entity({ name: 'user_profile_images' })
export class UserProfileImage {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	@DeletedAtColumn()
	deletedAt: Date;

	@OneToOne(() => Image, (object) => object.userProfile)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: Image;

	// @OneToOne(() => User, (object) => object.profileImage)
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
