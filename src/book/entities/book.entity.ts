import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  @ManyToOne(() => BookCategory, { eager: true })

  @ManyToMany(() => User, (user) => user.likedBooks)
  @JoinTable()
  likedBy: User[];
  
  @JoinColumn({ name: 'categoryId' })
  category: BookCategory;

  @Column({ nullable: true })
  categoryId?: string;
}
