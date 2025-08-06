import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  sla: { type: mongoose.Schema.Types.ObjectId, ref: 'SLA' },
  dueDate: { type: Date },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
