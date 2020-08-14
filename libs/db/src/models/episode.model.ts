import { Prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode {
    @ApiProperty({title:'课程名称'})
    @Prop()
    name:string

    @ApiProperty({title:'视频'})
    @Prop()
    file: string
    
    @Prop({ref:'course'})
    course:Ref<Course>
}
