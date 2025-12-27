import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ example: 'Penguin Classics' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
