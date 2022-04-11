import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/users.dto';
import { User, UserDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private messageModel: Model<UserDocument>) { }

  async create(createUserDto: createUserDto): Promise<User> {
    const createdMessage = new this.messageModel(createUserDto);
    const salt = await bcrypt.genSalt();
    createdMessage.password = await bcrypt.hash(createdMessage.password, salt);
    createdMessage.role = Role.Admin
    return createdMessage.save();
  }

  async findAll(): Promise<User[]> {
    return this.messageModel.find().exec();
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.messageModel.findOne({ username: username }).exec();
  }

  async delete(id: string) {
    const deletedMessage = await this.messageModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMessage;
  }
  async update(id: string, createUserDto: createUserDto) {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, createUserDto)
      .setOptions({ overwrite: true, new: true })
    return updatedMessage;
  }
}
