import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./schema/user.mongooschema";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User', 'PrimaryConnection')
        private userModel: Model<UserDocument>
    ) { }

    async createUser(user: UserDocument): Promise<UserDocument> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
}