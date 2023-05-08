import { Schema, model, models, Document, Model } from 'mongoose';
import { nanoid } from 'nanoid';

export interface IUrl extends Document {
  code: string;
  url: string;
  clicked: number;
}

const UrlSchema = new Schema({
  code: { type: String, unique: true, default: () => nanoid(7) },
  url: { type: String, require: true },
  clicked: { type: Number, default: 0 },
});

const Urls = (models.Urls as Model<IUrl>) || model<IUrl>('Urls', UrlSchema);

export default Urls;
