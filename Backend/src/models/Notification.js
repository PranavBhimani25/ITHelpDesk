import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  type: { type: String }, // e.g., 'ticket_update', 'comment', etc.
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
