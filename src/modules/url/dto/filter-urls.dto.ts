import { IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FilterUrlsDto extends PaginationDto {
  @IsOptional()
  filter?: string;
}
