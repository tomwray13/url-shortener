import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UidService } from '../../services/uid/uid.service';
import { DatabaseService } from '../../database/database.service';
import { ConfigService } from '@nestjs/config';
import { FilterUrlsDto } from './dto/filter-urls.dto';

@Injectable()
export class UrlService {
  private host: string;
  constructor(
    private readonly uidService: UidService,
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.host = this.configService.getOrThrow(`host`);
    console.log(`on module init`, this.host);
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

  async findAll({ page = 1, limit = 10, filter }: FilterUrlsDto) {
    const skip = (page - 1) * limit;
    const whereClause = filter
      ? {
          OR: [
            { title: { contains: filter } },
            { description: { contains: filter } },
            { redirect: { contains: filter } },
            { url: { contains: filter } },
          ],
        }
      : {};
    const data = await this.databaseService.url.findMany({
      where: whereClause,
      skip,
      take: limit,
    });
    const totalCount = await this.databaseService.url.count({
      where: whereClause,
    });

    const meta = {
      totalCount,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: skip + limit < totalCount,
      hasPreviousPage: skip > 0 && page > 1,
    };

    return { data, meta };
  }

  async findOne(uid: string) {
    return await this.databaseService.url.findUnique({
      where: {
        url: `${this.host}/${uid}`,
      },
    });
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    return await this.databaseService.url.update({
      where: {
        id,
      },
      data: updateUrlDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.url.delete({
      where: {
        id,
      },
    });
  }
}
