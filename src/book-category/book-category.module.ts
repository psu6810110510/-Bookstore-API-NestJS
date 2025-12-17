import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. import นี้
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { BookCategory } from './entities/book-category.entity'; // 2. import นี้

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])], // 3. ใส่บรรทัดนี้
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}