import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookCategoryModule } from './book-category/book-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      // 👇 เพิ่มบรรทัดนี้สำคัญมาก! (เพื่อให้มันไปกวาดหาตารางใน Module อื่นๆ เอง)
      autoLoadEntities: true, 
      synchronize: true, // ใช้เฉพาะตอน Dev (มันจะแก้ Structure ตารางให้อัตโนมัติ)
    }),
    BookCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}