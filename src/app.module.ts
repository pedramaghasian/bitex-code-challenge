import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ConfigModule } from '@nestjs/config';
import { ProductRepository } from './repository/product.repository';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.forRoot()],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class AppModule {}
