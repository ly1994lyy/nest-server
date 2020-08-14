import { Controller,Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';


@Crud({
    model:Episode
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
    constructor(
        @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
        @InjectModel(Course) private readonly courseModel:ReturnModelType<typeof Course>
    ) { }
    
    @Get('option')
    async option() {
        const course = (await this.courseModel.find()).map(v => ({
            label: v.name,
            value: v._id
        }))
        return {
            title: '课时管理',
            align: "center",
            translate:false,
            column: [
                {
                    label: '所属课程',
                    prop: 'course',
                    type: 'select',
                    dicData:course
                },
                {
                    label: '课程名称',
                    prop: 'name',
                },
                {
                    label: '视频文件',
                    prop: 'file',
                    type: 'upload',
                    action: '/upload',
                    listType: 'picture-img',
                },
            ],
        };
    }
}
