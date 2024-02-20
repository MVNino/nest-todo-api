import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  public description: string;
}
