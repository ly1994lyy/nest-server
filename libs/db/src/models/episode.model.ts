import { modelOptions, Ref, prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode {
    @ApiProperty({title:'课程名称'})
    @prop()
    name:string

    @ApiProperty({title:'视频'})
    @prop()
    file: string
    
    @prop({ref:'course'})
    course:Ref<Course>
}
