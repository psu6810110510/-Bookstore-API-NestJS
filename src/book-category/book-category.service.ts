import { Injectable, OnModuleInit } from '@nestjs/common';
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

  create(createBookCategoryDto: CreateBookCategoryDto) {
    return 'This action adds a new bookCategory';
  }

  findAll() {
    return `This action returns all bookCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCategory`;
  }

  update(id: number, updateBookCategoryDto: UpdateBookCategoryDto) {
    return `This action updates a #${id} bookCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCategory`;
  }
}