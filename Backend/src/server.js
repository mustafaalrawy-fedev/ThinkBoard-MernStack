import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';

// load environment variables from .env file
dotenv.config();

// console.log(process.env.MONGODB_URI); // HERE I WILL GET undefined if I don't use dotenv package and use dotenv.config() in server.js file.

const app = express();

// Connect to MongoDB // here the app will start first then the database will connect after that.
// so to fix that we need to put this function to promise and then use it in app.listen() function.
// connectDb();

// middlewares
if (process.env.NODE_ENV !== 'production') {
  // this will allow the frontend to access the backend api in development mode
  app.use(cors({ origin: 'http://localhost:5173' })); // this will allow the frontend to access the backend api
}

app.use(express.json()); //  this to parse the body of the request
app.use(rateLimiter); // Temporarily disabled - uncomment when Upstash is configured

// custom middleware to log the request before sent the response
// app.use((req, res, next) => {
//   console.log('Request received!', `${req.method} ${req.url}`);
//   next();
// });

const PORT = process.env.PORT || 5001;
// This will make database connect before the app run
// in the terminal will be like this
// Connected to MongoDB Successfully!
// Server is running on port 5001
const __dirname = path.resolve();

// serve the frontend files as static files or static assets
app.use(
  express.static(path.join(__dirname, '../Frontend/thinkboard-app/dist'))
);

// API routes - MUST come after static files but BEFORE catch-all route
app.use('/api/notes', notesRoutes);

// We only want to serve the index.html when we use render.com for deployment
// This will run in the production mode only
// IMPORTANT: This catch-all route MUST be last
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../Frontend/thinkboard-app/dist', 'index.html')
    );
  });
}

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
