import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

type Genre = { id: number; name: string };

@Injectable()
export class GenresService {
  private genres: Genre[] = [
    { id: 1, name: 'Classic' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Victorian' },
    { id: 4, name: 'Adventure' },
  ];

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  create(genre: { name: string }) {
    const exists = this.genres.some(
      (g) => g.name.toLowerCase() === genre.name.toLowerCase(),
    );
    if (exists) {
      throw new ConflictException(`Genre with name "${genre.name}" already exists`);
    }

    const newGenre: Genre = { id: this.getNextId(), name: genre.name };
    this.genres.push(newGenre);
    return newGenre;
  }

  update(id: number, update: { name?: string }) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    if (update.name) {
      const exists = this.genres.some(
        (g) => g.id !== id && g.name.toLowerCase() === update.name!.toLowerCase(),
      );
      if (exists) {
        throw new ConflictException(`Genre with name "${update.name}" already exists`);
      }
    }

    this.genres[index] = { ...this.genres[index], ...update };
    return this.genres[index];
  }

  delete(id: number) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    const [deleted] = this.genres.splice(index, 1);
    return deleted;
  }

  private getNextId() {
    return this.genres.length ? Math.max(...this.genres.map((g) => g.id)) + 1 : 1;
  }
}
