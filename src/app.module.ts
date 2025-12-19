import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookCategory } from './book-category/entities/book-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      autoLoadEntities: true,
      entities: [BookCategory],
      synchronize: true,
      
    }),
    BookCategoryModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}