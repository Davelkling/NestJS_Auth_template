import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { HttpException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({ where: { username: createUserDto.username } });
    if (userExists) {
      throw new BadRequestException('Username already exists');
    }
    bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY), async (err, hash) => {
      if (err) {
        throw new HttpException(err, 500);
      }
      createUserDto.password = hash;
      await this.prisma.user.create({ data: { ...createUserDto } });
    });
    return { message: [`Successfully created user ${createUserDto.username}`] };
  }
  
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findOneByUsername(username: string) {
    username = username.toLowerCase();
    return await this.prisma.user.findUnique({ where: {  username } });
  }
}
