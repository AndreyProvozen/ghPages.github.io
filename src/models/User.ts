import { Schema, model, models, type Document, type Model, Types } from 'mongoose';

export interface IUser extends Document {
  _doc: any;
  _id: Types.ObjectId;
  __v: string;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  userLinks: string[];
  provider: string;
}

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    provider: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true }
);

const User = (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;
