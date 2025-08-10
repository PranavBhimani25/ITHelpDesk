import expreess from "express";
import protect from "../middleware/authMiddleware.js";
import { getAllCommentOnTicket, addCommentOnTicket, deleteComment } from "../controller/commentController.js";

const route = expreess.Router()

route.get("/:ticketid",protect, getAllCommentOnTicket);
route.post("/:ticketid",protect, addCommentOnTicket);
route.delete("/:commentid",protect, deleteComment)

export default route;