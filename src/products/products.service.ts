import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createProductDto } from './dto/products.dto';
import { Product, ProductDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private messageModel: Model<ProductDocument>) {}

    async create(createProductDto: createProductDto): Promise<Product> {
        const createdProduct = new this.messageModel(createProductDto);
        return createdProduct.save();
      }
    
      async findAll(): Promise<Product[]> {
        return this.messageModel.find().exec();
      } 
    
      async findOne(id: string): Promise<Product> {
        return this.messageModel.findOne({ _id: id }).exec();
      }
    
      async delete(id: string) {
        const deletedProduct = await this.messageModel
          .findByIdAndRemove({ _id: id })
          .exec();
        return deletedProduct;
      }
      async update(id: string, createProductDto: createProductDto) {
        const updatedProduct = await this.messageModel
        .findByIdAndUpdate(id, createProductDto)
        .setOptions({ overwrite: true, new: true })
        return updatedProduct;
      }
}
