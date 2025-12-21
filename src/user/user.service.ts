import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto; 

    const existingUser = await this.userRepo.findOne({ where: { email } }); 
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepo.create({
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await this.userRepo.save(newUser);
    const { password: _, ...result } = savedUser;
    return result;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepo.find();
  }

async findOne(id: string) {
  const user = await this.userRepo.findOne({ where: { id } });
  if (!user) {
    throw new NotFoundException(`ไม่พบผู้ใช้ ID: ${id}`);
  }
  return user;
}

  async update(id: string, updateUserDto: any) {
    const user = await this.findOne(id);
    return this.userRepo.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
  try {
    const user = await this.findOne(id); 
    return await this.userRepo.remove(user);
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException('เกิดข้อผิดพลาดในการลบข้อมูล');
  }
}
}
