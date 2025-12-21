import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY_1234', 
      signOptions: { expiresIn: '3h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // เพิ่ม JwtStrategy เข้าไป
})
export class AuthModule {}