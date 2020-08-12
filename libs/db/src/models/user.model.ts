import { Prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class User {
    @ApiProperty({title:'用户名'})
    @Prop()
    username:string

    @ApiProperty({title:'密码'})
    @Prop()
    password:string
}