import mongoose from 'mongoose';

const observerLogSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  stage: {
    type: String,
    enum: ['orientation', 'assignment', 'monitoring', 'feedback', 'transition'],
    default: 'orientation'
  },
  orientationCompleted: {
    type: Boolean,
    default: false
  },
  orientationDate: Date,
  assignedMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  },
  assignedPosition: {
    type: String,
    enum: ['FOH', 'Monitor Mix', 'BC Mix', 'Other']
  },
  startDate: Date,
  trialDuration: {
    type: Number,
    default: 4 // weeks
  },
  assignedSchedule: [String], // ['Sundays', 'SNS', 'Midweek']
  evaluations: [{
    date: { type: Date, default: Date.now },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
    punctuality: { type: Number, min: 1, max: 5 },
    attitude: { type: Number, min: 1, max: 5 },
    initiative: { type: Number, min: 1, max: 5 },
    participation: { type: Number, min: 1, max: 5 },
    notes: String
  }],
  progressScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['orientation', 'orientation_completed', 'assigned', 'monitoring', 'review_pending', 'active', 'inactive', 'archived'],
    default: 'orientation'
  },
  lastReminderSent: Date,
  nextCheckpoint: Date
}, {
  timestamps: true
});

// Calculate progress score from evaluations
observerLogSchema.methods.calculateProgressScore = function() {
  if (this.evaluations.length === 0) return 0;
  
  const totalScore = this.evaluations.reduce((sum: number, evaluation: any) => {
    return sum + (evaluation.punctuality + evaluation.attitude + evaluation.initiative + evaluation.participation);
  }, 0);
  
  const maxPossibleScore = this.evaluations.length * 20; // 4 criteria × 5 max points
  return Math.round((totalScore / maxPossibleScore) * 100);
};

export default mongoose.models.ObserverLog || mongoose.model('ObserverLog', observerLogSchema);