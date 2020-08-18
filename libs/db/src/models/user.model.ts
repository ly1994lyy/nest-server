import { modelOptions, DocumentType, prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcrypt'

export type UserDocument = DocumentType<User>

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class User {
    @ApiProperty({title:'用户名'})
    @prop()
    username:string

    @ApiProperty({title:'密码'})
    @prop({
        select:false,
        get(val) {
            return val
        },
        set(val) {
            return val ? hashSync(val,10):val
        }
    })
    password:string
}