import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { commentDto } from './dto/comment.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserDocument } from '@libs/db/models/user.model';

@Controller('comments')
export class CommentsController {
    constructor(
        @InjectModel(Comment) private commentModel:ReturnModelType<typeof Comment>
    ) { }
    
    @Get()
    async index():Promise<any> {
        return await this.commentModel.find()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() dto: commentDto, @CurrentUser() user: UserDocument): Promise<any> {
        dto.user = user._id
        return await this.commentModel.create(dto)
    }
}
