import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  theme: 'info' | 'success' | 'warning' | 'error' | 'celebration';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  theme: { 
    type: String, 
    enum: ['info', 'success', 'warning', 'error', 'celebration'],
    default: 'info'
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);