import { Injectable } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { UndoLikeActionDto } from './dto/undoLikeAction.dto';
import { LikeActionDto } from './dto/likeAction.dto';

@Injectable()
export class UserActionService {
	private logger: any;

	constructor(
		// todo: custom respository 로 설정하려고 하면 userRepository가 제대로 인젝션이
		//  안되서 껍데기만 있는 객체가 나와서, 사용시에 부모클래스 메소드 가 없다고 에러 터진다
		@InjectRepository(UserEntity)
		public readonly userRepository: Repository<UserEntity>,
	) {
		this.logger = logger;
	}

	async like(toUserId: number, dto: LikeActionDto): Promise<string> {
		const result = await this.userRepository.findByIds([
			toUserId,
			dto.fromUserId,
		]);

		return 'like user';
	}

	async undoLike(toUserId: number, dto: UndoLikeActionDto): Promise<string> {
		return 'undo like user';
	}
}
