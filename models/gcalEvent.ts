import mongoose, { Schema } from "mongoose";

const gcalEventSchema = new Schema({
  externalId: { type: String, unique: true, required: true },
  title: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: { type: String },
  location: { type: String },
  colorId: { type: String },
  source: { type: String, default: "gcal" },
  updatedAt: { type: Date }
}, { timestamps: true, strict: true });

const GCalEvent = mongoose.models.GCalEvent || mongoose.model("GCalEvent", gcalEventSchema);

export default GCalEvent;
