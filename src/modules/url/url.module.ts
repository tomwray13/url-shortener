import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UidModule } from '../../services/uid/uid.module';

@Module({
  imports: [UidModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
