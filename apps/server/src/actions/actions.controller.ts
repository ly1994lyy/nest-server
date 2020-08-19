import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from '@libs/db/models/action.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { statusDto } from './dto/status.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserDocument } from '@libs/db/models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions')
export class ActionsController {
    constructor(
        @InjectModel(Action) private actionMeodel:ReturnModelType<typeof Action>
    ) { }
    
    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    async getStatus(@Query() dto: statusDto, @CurrentUser() user: UserDocument): Promise<any> {
        dto.user = user._id
        const count = await this.actionMeodel.countDocuments(dto)
        return {
            status:count > 0
        }
    }

    @Post('toggle')
    @UseGuards(AuthGuard('jwt'))
    async toggle(@Body() dto: statusDto, @CurrentUser() user: UserDocument): Promise<any>{
        dto.user = user._id
        const ret =await this.getStatus(dto, user)
        if (ret.status) {
            await this.actionMeodel.deleteMany(dto)
        } else {
            await this.actionMeodel.create(dto)
        }
        return await this.getStatus(dto,user)
    }
}
