import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}
