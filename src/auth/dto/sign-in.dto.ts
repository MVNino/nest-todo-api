import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public password: string;
}
