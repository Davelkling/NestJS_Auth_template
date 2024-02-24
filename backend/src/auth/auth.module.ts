import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule} from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import 'dotenv/config';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '7d'},
    })],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
