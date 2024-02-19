import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public title: string;

  @IsString()
  @MaxLength(255)
  public description: string;
}
