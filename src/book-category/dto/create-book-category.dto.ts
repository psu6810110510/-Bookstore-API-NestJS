import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookCategoryDto {
  @IsString()         
  @IsNotEmpty()       
  name: string;

  @IsString()         
  @IsOptional()       
  description?: string;
}