import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import requestLogger from './middleware/requestLogger.js'; 

const app = express();
app.use(requestLogger); 
app.use(rateLimiter);
app.use(express.json());
app.use('/api/usuarios', userRoutes);

export default app; 
