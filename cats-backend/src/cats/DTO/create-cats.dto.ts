import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatsDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  age: number;

  @IsString()
  image: string;
}
