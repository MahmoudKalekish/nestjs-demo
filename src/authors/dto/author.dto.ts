import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Jane Austen' })
  name: string;

  @ApiProperty({ example: 'jane.austen@example.com' })
  email: string;
}
