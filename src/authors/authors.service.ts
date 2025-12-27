import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  private authors = [
    { id: 1, name: 'Jane Austen', email: 'jane.austen@example.com' },
    { id: 2, name: 'Charles Dickens', email: 'charles.dickens@example.com' },
    { id: 3, name: 'Mark Twain', email: 'mark.twain@example.com' },
  ];

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    const author = this.authors.find((a) => a.id === id);
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return author;
  }

  create(author: { name: string; email: string }) {
    const newAuthor = { id: this.getNextId(), ...author };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, author: { name?: string; email?: string }) {
    const index = this.authors.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException(`Author with ID ${id} not found`);

    this.authors[index] = { ...this.authors[index], ...author };
    return this.authors[index];
  }

  delete(id: number) {
    const index = this.authors.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException(`Author with ID ${id} not found`);

    const [deleted] = this.authors.splice(index, 1);
    return deleted;
  }

  private getNextId() {
    return this.authors.length ? Math.max(...this.authors.map((a) => a.id)) + 1 : 1;
  }
}
