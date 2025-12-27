import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // BONUS: includeAuthor query param
  // Example: /books?includeAuthor=true
  @Get()
  @ApiQuery({
    name: 'includeAuthor',
    required: false,
    type: Boolean,
    description: 'When true, include nested author details in the response.',
  })
  @ApiOkResponse({
    description:
      'Returns books. If includeAuthor=true, authorId is replaced by an author object.',
    type: BookDto,
    isArray: true,
  })
  findAll(
    @Query('includeAuthor', new DefaultValuePipe(false), ParseBoolPipe)
    includeAuthor: boolean,
  ) {
    return this.booksService.findAll(includeAuthor);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({
    name: 'includeAuthor',
    required: false,
    type: Boolean,
    description: 'When true, include nested author details in the response.',
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeAuthor', new DefaultValuePipe(false), ParseBoolPipe)
    includeAuthor: boolean,
  ) {
    return this.booksService.findOne(id, includeAuthor);
  }

  @Post()
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ type: BookDto })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({ type: BookDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Deleted book', type: BookDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
