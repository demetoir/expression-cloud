import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';

@Entity({ name: 'user_oauths' })
export class UserOauthEntity extends BaseEntity {
	@Column({ name: 'type', type: 'bigint', nullable: false })
	type: number;

	@Column({ name: 'auth_id', type: 'text', nullable: false })
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
