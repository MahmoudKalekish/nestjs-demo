import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Classic' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
