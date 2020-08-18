import { modelOptions, Ref, arrayProp, prop } from '@typegoose/typegoose'
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
    @prop()
    name:string

    @ApiProperty({title:'封面图'})
    @prop()
    cover:string

    @arrayProp({
        ref: 'Episode',
        localField: '_id',
        foreignField: 'course',
    })
    episodes:Ref<Episode>[]
}