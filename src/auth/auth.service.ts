import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService,
  ) {}

 async login(loginDto: any) {
  const { email, password } = loginDto;
  const user = await this.userService.findByEmail(email);
  
  if (!user || !user.password) {
    throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
}
}