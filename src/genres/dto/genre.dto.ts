import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Classic' })
  name: string;
}
