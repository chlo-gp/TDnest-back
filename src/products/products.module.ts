import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {Product, productSchema} from './schema/products.schema'
import {RolesGuard} from '../roles.guard'

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
