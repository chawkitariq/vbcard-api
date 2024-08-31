import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;

  name: string;

  alias?: string;

  extension?: string;

  type?: string;

  size?: number;

  width?: number;

  height?: number;
}
