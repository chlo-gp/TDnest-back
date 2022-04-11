import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role:user.role, avatar:user.avatar };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}