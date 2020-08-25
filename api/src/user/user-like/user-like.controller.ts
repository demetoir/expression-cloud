import { Controller } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('user-like')
export class UserLikeController {
	constructor(private readonly userLikeService: UserService) {}
}
