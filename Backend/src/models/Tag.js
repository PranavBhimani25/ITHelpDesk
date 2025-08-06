import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  color: { type: String }, // optional for UI
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;