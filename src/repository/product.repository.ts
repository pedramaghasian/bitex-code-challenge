import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: number): Promise<any> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(productDto: ProductDto): Promise<any> {
    return this.prisma.product.create({
      data: productDto,
    });
  }

  async update(id: number, productDto: ProductDto): Promise<any> {
    return this.prisma.product.update({
      where: { id },
      data: productDto,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
