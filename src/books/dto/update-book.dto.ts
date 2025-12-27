import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  authorId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  publisherId?: number;

  @ApiPropertyOptional({ type: [Number], example: [1, 4] })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @IsOptional()
  genreIds?: number[];
}
