import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookCategory } from '../book-category/entities/book-category.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(BookCategory)
    private categoryRepo: Repository<BookCategory>,
  ) {}

  async create(createDto: CreateBookDto) {
    // optional: validate category exists if categoryId provided
    if (createDto.categoryId) {
      const cat = await this.categoryRepo.findOneBy({ id: createDto.categoryId });
      if (!cat) throw new NotFoundException(`Category ${createDto.categoryId} not found`);
    }

    const book = this.bookRepo.create(createDto as any);
    return this.bookRepo.save(book);
  }

  findAll() {
    return this.bookRepo.find();
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async update(id: string, updateDto: UpdateBookDto) {
    await this.findOne(id);
    await this.bookRepo.update(id, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.bookRepo.delete(id);
  }

  async incrementLikes(id: string) {
    const book = await this.findOne(id);
    book.likeCount += 1;
    return this.bookRepo.save(book);
  }
}
