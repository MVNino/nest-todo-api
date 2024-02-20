import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { SignInDto } from './dto/sign-in.dto';
import { Prisma, User as UserModel } from '@prisma/client';
import { comparePassword, encryptPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: SignInDto): Promise<string | null> {
    const user: UserModel = await this.usersService.findOne({ email });

    if (!user) return null;

    const matched: boolean = comparePassword(password, user.password);

    if (!matched) return null;

    const sub: number = user.id;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: encryptedPassword, id, ...userData } = user;

    return this.jwtService.sign(
      { sub, ...userData },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiresIn,
      },
    );
  }

  async register(data: Prisma.UserCreateInput): Promise<UserModel> {
    const password = encryptPassword(data.password);

    return this.usersService.create({ ...data, password });
  }
}
