import { IsNumber, IsString } from 'class-validator';

export class CreateCatsDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsNumber()
  age: number;

  @IsString()
  image: string;
}
