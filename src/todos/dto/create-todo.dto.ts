import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public title: string;

  @IsString()
  @MaxLength(255)
  public description: string;
}
