import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UidService } from '../../services/uid/uid.service';
import { DatabaseService } from '../../database/database.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  private readonly host: string;
  constructor(
    private readonly uidService: UidService,
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.host = this.configService.getOrThrow(`host`);
  }

  async create(createUrlDto: CreateUrlDto) {
    const uid = this.uidService.generate(10);
    const url = await this.databaseService.url.create({
      data: {
        ...createUrlDto,
        url: `${this.host}/${uid}`,
      },
    });
    return url;
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
