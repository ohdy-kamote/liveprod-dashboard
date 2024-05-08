import { category } from "@/utils/constants";
import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  service: {
    type: String,
    enum: category.SERVICES,
    required: true
  },
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: "Volunteer"
  },
  role: {
    type: String,
    enum: category.ROLES,
    required: true
  },
  dateServiceRole: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true, strict: true });

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
