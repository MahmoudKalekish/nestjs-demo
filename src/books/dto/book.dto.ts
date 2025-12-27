import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Pride and Prejudice' })
  title: string;

  @ApiProperty({ example: 1 })
  authorId: number;

  @ApiProperty({ example: 1 })
  publisherId: number;

  @ApiProperty({ type: [Number], example: [1, 2] })
  genreIds: number[];
}
