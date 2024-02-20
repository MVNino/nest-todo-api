import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: SignInDto): Promise<string | null> {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) {
      const sub = user.id;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, id, ...userData } = user;

      const payload = { sub, ...userData };

      // Note: temporarily supplying secret & expiresIn here
      return this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '1h',
      });
    }

    return null;
  }
}
