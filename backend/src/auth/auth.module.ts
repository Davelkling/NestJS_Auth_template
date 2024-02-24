import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService} from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [UsersModule, PrismaModule, PassportModule, JwtModule.register({ // Register JwtModule here
        secret: process.env.JWT_SECRET, // Ensure you have JWT_SECRET set in your environment
        signOptions: { expiresIn: '7d' },
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
