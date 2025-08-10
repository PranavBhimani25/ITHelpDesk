import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";

export const getAllCommentOnTicket = async (req, res) => {
  try {
    const id = req.params.ticketid;

    const ticket = await Ticket.findById(id).populate("comments");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket.comments);
  } catch {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const addCommentOnTicket = async (req, res) => {
  try {
    const { ticketid } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    const ticket = await Ticket.findById(ticketid);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const comment = await Comment.create({
      message,
      ticket: ticketid,
      author: userId,
    });

    ticket.comments.push(comment._id);
    await ticket.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment." });
  }
};

export const deleteComment = async (req, res) => {
    const { commentid } = req.params;
    
    try {
        const comment = await Comment.findById(commentid)
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.author.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }
        await Comment.findByIdAndDelete(commentid);
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};
