import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

// load environment variables from .env file
dotenv.config();

// console.log(process.env.MONGODB_URI); // HERE I WILL GET undefined if I don't use dotenv package and use dotenv.config() in server.js file.

const app = express();

// Connect to MongoDB // here the app will start first then the database will connect after that.
// so to fix that we need to put this function to promise and then use it in app.listen() function.
// connectDb();

// middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // this will allow the frontend to access the backend api
app.use(express.json()); //  this to parse the body of the request
app.use(rateLimiter); // this will check the rate limit for each request, like if user cannot sent request more than 10 times in 20 seconds then it will send a response that you have reached the rate limit.

// custom middleware to log the request before sent the response
// app.use((req, res, next) => {
//   console.log('Request received!', `${req.method} ${req.url}`);
//   next();
// });

// to make the routes more manageable we will use the router in routes folder and use it here with a prefix /api/notes which is the base url for all the notes routes
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5001;
// This will make database connect before the app run
// in the terminal will be like this
// Connected to MongoDB Successfully!
// Server is running on port 5001
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
