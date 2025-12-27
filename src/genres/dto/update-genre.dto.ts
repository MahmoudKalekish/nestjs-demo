import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto {
  @ApiPropertyOptional({ example: 'Adventure' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
