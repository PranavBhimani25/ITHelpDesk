import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;