import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LikeActionDto } from './dto/likeAction.dto';
import { UndoLikeActionDto } from './dto/undoLikeAction.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
	constructor(@InjectRepository(UserEntity) repo) {
		super(repo);
	}

	async like(toUserId: number, dto: LikeActionDto): Promise<string> {
		const result = await this.repo.findByIds([toUserId, dto.fromUserId]);

		return 'like user';
	}

	async undoLike(toUserId: number, dto: UndoLikeActionDto): Promise<string> {
		return 'undo like user';
	}
}
