import { Schema, model, models, Document, Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  userLinks: string[];
}

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
  userLinks: [{ type: String }],
});

const User = (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;
