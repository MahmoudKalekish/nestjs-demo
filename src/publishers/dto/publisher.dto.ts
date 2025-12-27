import { ApiProperty } from '@nestjs/swagger';

export class PublisherDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Penguin Classics' })
  name: string;
}
