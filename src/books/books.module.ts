import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsModule } from '../authors/authors.module';
import { PublishersModule } from '../publishers/publishers.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [AuthorsModule, PublishersModule, GenresModule],
})
export class BooksModule {}
