import { Prop, modelOptions, Ref, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

@modelOptions({
    schemaOptions:{
        timestamps: true,
        toJSON:{virtuals:true}
    }
})
export class Course {
    @ApiProperty({title:'课程名称'})
    @Prop()
    name:string

    @ApiProperty({title:'封面图'})
    @Prop()
    cover:string

    @arrayProp({
        ref: 'Episode',
        localField: '_id',
        foreignField: 'course',
    })
    episodes:Ref<Episode>[]
}