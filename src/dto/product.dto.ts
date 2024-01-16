import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'The description of the product',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 10.99, description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100, description: 'The quantity of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
