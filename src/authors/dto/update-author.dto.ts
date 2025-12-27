import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ example: 'New Name' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'new.email@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;
}
