import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  page?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  limit?: number;
}
