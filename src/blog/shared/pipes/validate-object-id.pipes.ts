import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    console.log(value);
    if (!isValid) {
      throw new BadRequestException('Invalid Id');
    }

    return value;
  }
}
