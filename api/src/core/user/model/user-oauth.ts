import { Entity } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
	VarcharColumn,
} from '../../../common';

@Entity()
export class UserOauth {
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

	@VarcharColumn()
	authId: string;

	// todo: oauth2.0인증시 필요한 컬럼 종류 정리하기
	//  google, github, naver, kakao, facebook 이거 5개 호환용
	//  client_id: string;
	//  client_secret: string;
	//  code: string;
	//  redirect_uri: string;
	//  state: string;
	//  grant_type: string;
	//  provider: string;

	// @OneToOne(() => User, (user) => user.oauth)
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
