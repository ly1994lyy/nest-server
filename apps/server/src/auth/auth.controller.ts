import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';


@Controller('auth')
@ApiTags('用户')
export class AuthController {
    constructor(
        private jwtService:JwtService,
        @InjectModel(User) private userModel:ReturnModelType<typeof User>
    ){}

    @Post('register')
    @ApiOperation({summary:'用户注册'})
    async register(@Body() dto: RegisterDto):Promise<User> {
        const { username, password } = dto
        const user = await this.userModel.create({username,password})
        return user
    }


    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: '用户登录' })
    async login(@Body() dto: LoginDto, @CurrentUser() user:UserDocument):Promise<any> {
        return {
            token: this.jwtService.sign({ _id: String(user._id)})
        }
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: '获取个人信息' })
    async user(@CurrentUser() user:UserDocument): Promise<any> {
        return user
    }
}
