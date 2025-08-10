import exprass from 'express';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouter.js'; 
import authRouter from './routes/authRouter.js';
import ticketRouter from './routes/ticketRouter.js'
import rateLimiter from './middleware/rateLimiter.js';
import commentRouter from './routes/commentRouter.js';
import cors from 'cors';

const app = exprass();
app.use(cors())
app.use(exprass.json());
app.use(rateLimiter); 
app.use("/api/auth", authRouter); 
app.use("/api/user", userRouter); 
app.use("/api/ticket", ticketRouter);
app.use("/api/comment", commentRouter)

connectDB().then(async () => {
  app.listen(5001, () => {
    console.log("Server is running on port 5001");
  });
  console.log("Database connection established");
}).catch(err => {
    console.error("Database connection failed:", err);
});
