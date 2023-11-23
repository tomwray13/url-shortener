import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UidService {
  generate(length?: number) {
    return nanoid(length);
  }
}
