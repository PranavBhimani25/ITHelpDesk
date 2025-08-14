import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  updateTicketStatus,
  assignTicket,
  countTickets,
} from "../controller/ticketController.js";

import protect from "../middleware/authMiddleware.js";
import { get } from "mongoose";
const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/",protect , createTicket);
router.put("/:id",protect, updateTicket);
router.delete("/:id",protect, deleteTicket);
router.patch("/:id/status",protect, updateTicketStatus);
router.patch("/:id/assign", assignTicket); 
router.get("/total", countTickets);

export default router;