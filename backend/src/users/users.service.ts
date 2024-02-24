import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  
  async findOne(username: string) {
    username = username.toLowerCase();
    return await this.prisma.user.findUnique({ where: {  username } });
  }
}