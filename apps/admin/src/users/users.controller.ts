import { Controller,Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger'

@Crud({
    model:User
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
    
    @Get('option')
    option() {
        return {
            title: '用户管理',
            align: "center",
            column: [
                {
                    label: '用户名',
                    prop: 'username',
                },
            ],
        };
    }
}
