import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  age: number;

  @IsOptional()
  @IsString()
  image: string;
}
