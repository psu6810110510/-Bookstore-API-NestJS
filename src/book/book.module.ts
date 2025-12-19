import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { BookCategory } from '../book-category/entities/book-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCategory])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
