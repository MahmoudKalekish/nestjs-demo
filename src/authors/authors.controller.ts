import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorDto } from './dto/author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOkResponse({ type: AuthorDto, isArray: true })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: AuthorDto })
  @ApiNotFoundResponse({ description: 'Author not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateAuthorDto })
  @ApiCreatedResponse({ type: AuthorDto })
  create(@Body() author: CreateAuthorDto) {
    return this.authorsService.create(author);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiOkResponse({ type: AuthorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() authorUpdate: UpdateAuthorDto) {
    return this.authorsService.update(id, authorUpdate);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: AuthorDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
