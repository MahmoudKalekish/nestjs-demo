import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from '../../authors/dto/author.dto';

export class BookWithAuthorDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Pride and Prejudice' })
  title: string;

  @ApiProperty({ example: 1 })
  publisherId: number;

  @ApiProperty({ type: [Number], example: [1, 2] })
  genreIds: number[];

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;
}
