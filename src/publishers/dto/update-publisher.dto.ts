import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePublisherDto {
  @ApiPropertyOptional({ example: 'HarperCollins' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
