import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createMessagesDto } from './dto/messages.dto';
import { Message, MessageDocument } from './schema/messages.schema';
import { User } from 'src/users/schema/users.schema';
import { MessagesGateway } from './messages.gateway';
import { Cron } from '@nestjs/schedule';
import { Role } from 'src/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private messagesGateway: MessagesGateway,
    private userService: UsersService
  ) { }

  async create(createMessagesDto: createMessagesDto, user: User): Promise<Message> {
    const createdMessage = new this.messageModel(createMessagesDto);
    createdMessage.date = new Date()
    createdMessage.author = user
    this.messagesGateway.sendNewMessage(createdMessage)
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().populate('author').exec();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedMessage = await this.messageModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMessage;
  }
  async update(id: string, createMessagesDto: createMessagesDto) {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, createMessagesDto)
      .setOptions({ overwrite: true, new: true })
    updatedMessage.date = new Date()
    return updatedMessage;
  }

  //@Cron('*/59 * * * * *')
  /*async handleCron() {
    const createMessageDto: createMessagesDto = {
      content: "test",
      firstname: "test2"
    }
    const random = Math.random()
    const user: User = await this.userService.create({
      username: "bob",
      password: "string",
      role: Role.User,
      avatar: `https://robohash.org/${random}?set=set4`
    })
    this.create(createMessageDto, user)
    console.log('Called');
  }*/
}
