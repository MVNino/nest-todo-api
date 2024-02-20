import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public password: string;
}
