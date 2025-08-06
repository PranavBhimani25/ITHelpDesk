import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;