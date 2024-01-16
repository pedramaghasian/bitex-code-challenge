import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductDto } from '../dto/product.dto';
import { ProductModel } from '../model/product.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new product',
    type: ProductModel,
  })
  async createProduct(@Body() productDto: ProductModel): Promise<ProductModel> {
    return this.productService.createProduct(productDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all products',
    type: ProductModel,
    isArray: true,
  })
  async getAllProducts(): Promise<ProductModel[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a product by ID',
    type: ProductModel,
  })
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductModel> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update a product by ID',
    type: ProductModel,
  })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: ProductDto,
  ): Promise<ProductModel> {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a product by ID' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
