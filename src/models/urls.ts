import { Schema, model, models } from "mongoose";
import shortid from "shortid";
const UrlSchema = new Schema({
  code: { type: String, unique: true, default: shortid.generate },
  url: { type: String, require: true },
  clicked: { type: Number, default: 0 },
});
const Urls = models.Urls || model("Urls", UrlSchema);
export default Urls;
