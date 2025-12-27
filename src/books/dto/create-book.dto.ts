import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Pride and Prejudice' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  authorId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  publisherId: number;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  genreIds: number[];
}
