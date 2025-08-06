import mongoose from 'mongoose';

const slaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  responseTimeHours: { type: Number, required: true },
  resolutionTimeHours: { type: Number, required: true },
}, { timestamps: true });

const SLA = mongoose.model('SLA', slaSchema);

export default SLA;
