import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}