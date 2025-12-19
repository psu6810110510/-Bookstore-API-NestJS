import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
