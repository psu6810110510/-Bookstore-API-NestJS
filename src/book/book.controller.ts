import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from '../auth/current-user.decorator';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @SetMetadata('roles', ['ADMIN'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard) 
  @Patch(':id/like')
  async toggleLike(
    @Param('id') bookId: string, 
    @CurrentUser() user: any ) 
    {
      return this.bookService.toggleLike(bookId, user.userId || user.sub);
    }
}
