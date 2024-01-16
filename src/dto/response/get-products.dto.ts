import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../product.dto';

export class GetProductsDto {
  @ApiProperty({
    isArray: true,
    type: ProductDto,
    description: 'List of products',
  })
  products: ProductDto[];
}
