import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

type Publisher = { id: number; name: string };

@Injectable()
export class PublishersService {
  private publishers: Publisher[] = [
    { id: 1, name: 'Penguin Classics' },
    { id: 2, name: 'HarperCollins' },
  ];

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((p) => p.id === id);
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  create(publisher: { name: string }) {
    const exists = this.publishers.some(
      (p) => p.name.toLowerCase() === publisher.name.toLowerCase(),
    );
    if (exists) {
      throw new ConflictException(
        `Publisher with name "${publisher.name}" already exists`,
      );
    }

    const newPublisher: Publisher = {
      id: this.getNextId(),
      name: publisher.name,
    };

    this.publishers.push(newPublisher);
    return newPublisher;
  }

  update(id: number, update: { name?: string }) {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    if (update.name) {
      const exists = this.publishers.some(
        (p) => p.id !== id && p.name.toLowerCase() === update.name!.toLowerCase(),
      );
      if (exists) {
        throw new ConflictException(
          `Publisher with name "${update.name}" already exists`,
        );
      }
    }

    this.publishers[index] = { ...this.publishers[index], ...update };
    return this.publishers[index];
  }

  delete(id: number) {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    const [deleted] = this.publishers.splice(index, 1);
    return deleted;
  }

  private getNextId() {
    return this.publishers.length
      ? Math.max(...this.publishers.map((p) => p.id)) + 1
      : 1;
  }
}
