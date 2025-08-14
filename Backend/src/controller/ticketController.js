import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

export const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ticket" });
  }
};

export const createTicket = async (req, res) => {
  const { title, description, priority, tags, attachments, sla, dueDate } =
    req.body;

  try {
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      tags,
      attachments,
      sla,
      dueDate,
      createdBy: req.user._id,
    });
    console.log("Ticket created:", ticket);

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Error creating ticket" });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    if (
      req.user.role !== "Admin" &&
      req.user.role !== "Agent" &&
      String(req.user._id) !== String(id)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update tickets" });
    }
    const { title, description, priority, tags, attachments, sla, dueDate } =
      req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (tags) ticket.tags = tags;
    if (attachments) ticket.attachments = attachments;
    if (sla) ticket.sla = sla;
    if (dueDate) ticket.dueDate = dueDate;

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket" });
    console.error("Update Ticket Error:", error);
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    if (req.user.role !== "Admin" && req.user.role !== "Agent") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete tickets" });
    }

    const ticket = await Ticket.findByIdAndDelete(id);
    // console.log("Ticket deleted:", id);
    await ticket?.deleteOne();
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ticket" });
    console.error("Delete Ticket Error:", error);
  }
};

export const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!id) {
      res.status(400).json({ message: "Ticket ID is required" });
    }

    if (req.user.role !== "Admin" && req.user.role !== "Agent") {
      return res
        .status(403)
        .json({ message: "Not authorized to update ticket status" });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.status = status;
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket status" });
    console.error("Update Ticket Status Error:", error);
  }
};
export const assignTicket = async (req, res) => {
  try {
      const { assignedTo } = req.body;
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  
      const agent = await User.findById(assignedTo);
      if (!agent || agent.role !== 'Agent') {
        return res.status(400).json({ message: 'Invalid agent user' });
      }
   
      ticket.assignedTo = assignedTo;
      await ticket.save();
      res.json(ticket);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
//   const { userId } = req.body;

//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }

//     console.log("USer ID for assignment:", userId);
//     const agent = await User.findById(userId);
//     if (!agent) {
//       return res.status(404).json({ message: "Agent not found" });
//     }

//     ticket.assignedTo = agent._id;
//     await ticket.save();
//     res.status(200).json({
//       message: "Ticket assigned successfully",
//       ticket,
//       agent: {
//         _id: agent._id,
//         name: agent.name,
//         email: agent.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error assigning ticket" });
//     console.error("Assign Ticket Error:", error);
//   }


};

export const countTickets = async (req, res) => {
  try {
    console.log("Counting tickets..."); // Debug step

    const totalTickets = await Ticket.countDocuments();

    console.log(`Found ${totalTickets} tickets`); // Debug step

    res.status(200).json({ total: totalTickets });
  } catch (error) {
    console.error("Error counting tickets:", error); // This will show the real cause
    res.status(500).json({
      message: "Error fetching ticket",
      error: error.message
    });
  }
};


