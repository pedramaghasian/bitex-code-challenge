import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { ProductDto } from '../dto/product.dto';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<ProductModel[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<ProductModel> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(productDto: ProductDto): Promise<ProductModel> {
    return this.productRepository.create(productDto);
  }

  async updateProduct(
    id: number,
    productDto: ProductDto,
  ): Promise<ProductModel> {
    const existingProduct = await this.getProductById(id);
    return this.productRepository.update(id, {
      ...existingProduct,
      ...productDto,
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.getProductById(id);
    return this.productRepository.delete(id);
  }
}
