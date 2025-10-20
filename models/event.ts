import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  status: {
    type: String,
    enum: ["confirmed", "tentative", "cancelled"],
    required: true,
    default: "confirmed"
  },
  date: {
    type: Date,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  callTime: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  praiseAndWorship: {
    type: Boolean,
    required: true,
    default: false
  },
  otherDetails: {
    type: String,
    default: ""
  },
  volunteersNeeded: {
    foh: { type: Boolean, default: false },
    assistantFoh: { type: Boolean, default: false },
    bcMix: { type: Boolean, default: false },
    assistantBcMix: { type: Boolean, default: false },
    monMix: { type: Boolean, default: false },
    rfTech: { type: Boolean, default: false }
  },
  assignedVolunteers: {
    foh: { type: Schema.Types.ObjectId, ref: "Volunteer" },
    assistantFoh: { type: Schema.Types.ObjectId, ref: "Volunteer" },
    bcMix: { type: Schema.Types.ObjectId, ref: "Volunteer" },
    assistantBcMix: { type: Schema.Types.ObjectId, ref: "Volunteer" },
    monMix: { type: Schema.Types.ObjectId, ref: "Volunteer" },
    rfTech: { type: Schema.Types.ObjectId, ref: "Volunteer" }
  }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;