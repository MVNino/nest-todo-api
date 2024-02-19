import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}
