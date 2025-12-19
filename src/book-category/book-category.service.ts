import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@Injectable()
export class BookCategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(BookCategory)
    private readonly repo: Repository<BookCategory>,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      console.log('--- Seeding Book Categories ---');
      await this.repo.save([
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and engineering' },
        { name: 'History', description: 'Past events' },
      ]);
      console.log('Seeding completed!');
    }
  }

  create(createDto: CreateBookCategoryDto) {
    return this.repo.save(createDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateDto: UpdateBookCategoryDto) {
    await this.repo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    try {
      const category = await this.findOne(id);
      return await this.repo.delete(id);
    } catch (error) {
      throw new Error('ไม่สามารถลบได้เนื่องจากหมวดหมู่นี้ถูกใช้งานอยู่ในตารางหนังสือ');
    }
  }
}