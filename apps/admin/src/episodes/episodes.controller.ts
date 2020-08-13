import { Controller,Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';


@Crud({
    model:Episode
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
    constructor(@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>) { }
    
    @Get('option')
    option() {
        return {
            title: '课时管理',
            column: [
                {
                    label: '课程名称',
                    prop: 'name',
                },
            ],
        };
    }
}
