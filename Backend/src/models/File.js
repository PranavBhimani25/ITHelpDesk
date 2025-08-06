import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;