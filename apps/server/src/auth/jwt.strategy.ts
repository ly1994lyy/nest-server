import { PassportStrategy } from '@nestjs/passport'
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        } as StrategyOptions)
    }

    async validate(id:string):Promise<User> {
        return await this.userModel.findById(id)
    }
}