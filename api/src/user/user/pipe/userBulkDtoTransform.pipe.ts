import { BulkDtoTransformPipe } from 'src/common/pipe/bulkDtoTransform.pipe';
import { UserCreateBulkDto } from 'src/user/user/dto';

export const userBulkDtoTransformPipe = new BulkDtoTransformPipe(
	UserCreateBulkDto,
);
