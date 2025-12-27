import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { PublishersService } from '../publishers/publishers.service';
import { GenresService } from '../genres/genres.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

type Book = {
  id: number;
  title: string;
  authorId: number;
  publisherId: number;
  genreIds: number[];
};

@Injectable()
export class BooksService {
  // IMPORTANT: We store genreIds INSIDE books (and NOT bookIds in genres)
  // to satisfy the "avoid duplicating data" requirement.
  private books: Book[] = [
    { id: 1, title: 'Pride and Prejudice', authorId: 1, publisherId: 1, genreIds: [1, 2] },
    { id: 2, title: 'Great Expectations', authorId: 2, publisherId: 2, genreIds: [1, 3] },
    { id: 3, title: 'Adventures of Huckleberry Finn', authorId: 3, publisherId: 1, genreIds: [1, 4] },
  ];

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly genresService: GenresService,
  ) {}

  findAll(includeAuthor = false) {
    return this.books.map((b) => this.toResponse(b, includeAuthor));
  }

  findOne(id: number, includeAuthor = false) {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return this.toResponse(book, includeAuthor);
  }

  create(dto: CreateBookDto) {
    // Validate relationships (throws NotFoundException if invalid)
    this.authorsService.findOne(dto.authorId);
    this.publishersService.findOne(dto.publisherId);
    dto.genreIds.forEach((gid) => this.genresService.findOne(gid));

    const newBook: Book = {
      id: this.getNextId(),
      title: dto.title,
      authorId: dto.authorId,
      publisherId: dto.publisherId,
      genreIds: this.normalizeGenreIds(dto.genreIds),
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: number, dto: UpdateBookDto) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // If relationship fields are being changed, validate them
    if (dto.authorId !== undefined) {
      this.authorsService.findOne(dto.authorId);
    }
    if (dto.publisherId !== undefined) {
      this.publishersService.findOne(dto.publisherId);
    }
    if (dto.genreIds !== undefined) {
      dto.genreIds.forEach((gid) => this.genresService.findOne(gid));
    }

    const updated: Book = {
      ...this.books[index],
      ...dto,
      ...(dto.genreIds ? { genreIds: this.normalizeGenreIds(dto.genreIds) } : {}),
    };

    this.books[index] = updated;
    return updated;
  }

  delete(id: number) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const [deleted] = this.books.splice(index, 1);
    return deleted;
  }

  // Turns a Book into either:
  // - Book (default)
  // - Book with nested author object (includeAuthor=true)
  private toResponse(book: Book, includeAuthor: boolean) {
    if (!includeAuthor) return book;

    const author = this.authorsService.findOne(book.authorId);
    const { authorId, ...rest } = book;
    return { ...rest, author };
  }

  private normalizeGenreIds(ids: number[]) {
    // prevents duplicates in a book like [1,1,2]
    return Array.from(new Set(ids));
  }

  private getNextId() {
    return this.books.length ? Math.max(...this.books.map((b) => b.id)) + 1 : 1;
  }
}
