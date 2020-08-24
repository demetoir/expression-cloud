import { DTOTransformPipe } from '../../../common/pipe/dtoTransform.pipe';
import { UserUpdateDto } from '../dto/userUpdate.dto';

export const dtoTransformPipe = new DTOTransformPipe(UserUpdateDto);
