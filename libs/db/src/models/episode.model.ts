import { Prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

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
    file:string
}
