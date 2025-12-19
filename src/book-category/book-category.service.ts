import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookCategoryService implements OnModuleInit {
  // 1. Inject Repository เข้ามาเพื่อใช้ติดต่อกับฐานข้อมูล
  constructor(
    @InjectRepository(BookCategory)
    private readonly bookCategoryRepository: Repository<BookCategory>,
  ) {}

  // 2. ฟังก์ชันนี้จะทำงานทันทีเมื่อ Module เริ่มต้น (ตามโจทย์ข้อ 2.4)
  async onModuleInit() {
    // เช็คจำนวนข้อมูลในตาราง
    const count = await this.bookCategoryRepository.count();
    
    // ถ้ายังไม่มีข้อมูล (count เป็น 0) ให้สร้างข้อมูลจำลอง
    if (count === 0) {
      console.log('Seeding Book Categories...'); // แสดงข้อความใน Terminal
      await this.bookCategoryRepository.save([
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and engineering' },
        { name: 'History', description: 'Past events' },
      ]);
      console.log('Seeding Complete!');
    }
  }

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const category = this.bookCategoryRepository.create(createBookCategoryDto);
    return this.bookCategoryRepository.save(category);
  }

  findAll() {
    return this.bookCategoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.bookCategoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException(`BookCategory ${id} not found`);
    return category;
  }

  async update(id: string, updateBookCategoryDto: UpdateBookCategoryDto) {
    await this.findOne(id); // will throw if not exists
    await this.bookCategoryRepository.update(id, updateBookCategoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.bookCategoryRepository.delete(id);
  }
} 