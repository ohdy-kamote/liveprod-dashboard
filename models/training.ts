import mongoose, { Schema, Document } from 'mongoose';

export interface ITraining extends Document {
  trainingName: string;
  description?: string;
  date: Date;
  trainors: string[];
  volunteers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TrainingSchema: Schema = new Schema({
  trainingName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  trainors: [{
    type: String,
    required: true,
    trim: true
  }],
  volunteers: [{
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
}, {
  timestamps: true
});

export default mongoose.models.Training || mongoose.model<ITraining>('Training', TrainingSchema);