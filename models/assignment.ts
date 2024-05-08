import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema({
  role: {
    type: String,
    require: true
  },
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: "Volunteer"
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: "Schedule"
  }
}, { timestamps: true });

const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

export default Assignment;
