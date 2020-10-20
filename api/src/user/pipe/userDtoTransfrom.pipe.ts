import { DTOTransformPipe } from 'src/common/pipe/dtoTransform.pipe';
import { UserUpdateDto } from 'src/user/dto';

export const dtoTransformPipe = new DTOTransformPipe(UserUpdateDto);
