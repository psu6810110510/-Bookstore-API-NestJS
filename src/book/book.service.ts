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
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(BookCategory)
    private readonly categoryRepo: Repository<BookCategory>,
  ) {}

  async create(createDto: CreateBookDto) {
    let category: BookCategory | undefined = undefined; 

    if (createDto.categoryId) {
      const foundCategory = await this.categoryRepo.findOneBy({ id: createDto.categoryId });
      if (!foundCategory) {
        throw new NotFoundException(`Category ${createDto.categoryId} not found`);
      }
      category = foundCategory;
    }

    const newBook = this.bookRepo.create({
      title: createDto.title,
      author: createDto.author,
      price: createDto.price,
      category: category,
    });

    return this.bookRepo.save(newBook);
  }

  async findAll() {
    return this.bookRepo.find({
      relations: ['likedBy'],
    });
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({ 
      where: { id },
      relations: ['category'] 
    });
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async update(id: string, updateDto: UpdateBookDto) {
    await this.findOne(id); 
    await this.bookRepo.update(id, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepo.remove(book);
  }

  async incrementLikes(id: string) {
    const book = await this.findOne(id);
    book.likeCount += 1;
    return this.bookRepo.save(book);
  }

  async toggleLike(bookId: string, userId: string) {
  const book = await this.bookRepo.findOne({
    where: { id: bookId },
    relations: ['likedBy'],
  });

  if (!book) throw new NotFoundException('Book not found');

  const isLiked = book.likedBy.some((user) => user.id === userId);

  if (isLiked) {
    book.likedBy = book.likedBy.filter((user) => user.id !== userId);
  } else {
    book.likedBy.push({ id: userId } as any);
  }
  book.likeCount = book.likedBy.length; 
  await this.bookRepo.save(book);

  return { status: isLiked ? 'unliked' : 'liked', totalLikes: book.likeCount };
}
}