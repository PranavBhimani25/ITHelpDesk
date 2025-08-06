import mongoose from 'mongoose';

const kbArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

const KnowledgeBase = mongoose.model('KnowledgeBase', kbArticleSchema);

export default KnowledgeBase;