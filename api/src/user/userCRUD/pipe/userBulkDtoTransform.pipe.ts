import { BulkDtoTransformPipe } from '../../../common/pipe/bulkDtoTransform.pipe';
import { UserCreateBulkDto } from '../dto/userCreateBulk.dto';

export const userBulkDtoTransformPipe = new BulkDtoTransformPipe(
	UserCreateBulkDto,
);
