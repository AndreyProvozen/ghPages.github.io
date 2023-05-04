import { Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";

const UrlSchema = new Schema({
  code: { type: String, unique: true, default: () => nanoid(7) },
  url: { type: String, require: true },
  clicked: { type: Number, default: 0 },
});
const Urls = models.Urls || model("Urls", UrlSchema);
export default Urls;
