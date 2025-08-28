### Tutorial of backend with Nodejs, Expressjs, MongoDB

• if we type on terminal "npm init -y", it will create a package.json file.

• if we want to use ES modules, we need to add "type": "module", in package.json file.
• if we didn't add "type": "module", in package.json file, we need to use "require" to import modules.
• if we add "type": "module", in package.json file, we need to use "import" to import modules.

```js
import express from 'express';

// This will work if in the package in json file we have "type": "module",
// otherwise we need to use "require" to import express.
const express = require('express');
// This will not work if in the package in json file we have "type": "commonjs",
```

• in package.json if we want to run this statement in terminal `npm run dev` we have to add in the scripts section. `"dev": "node server.js"` to run the server.js file. with `npm run dev` statement in terminal otherwise it will work in terminal with the `node server.js` statement and will not work with `npm run dev` statement.

## When we want to update a something in the code in `server.js`

1. we need to stop the server with `ctrl + c` in terminal.
2. we need to run the server again with `npm run dev` in terminal.

• this is the way to run the server in development mode. and it is anoying to stop and run the server again and again when we make changes in the code. so we use `nodemon` to run the server in development mode. and it will automatically restart the server when we make changes in the code.

• so to install `nodemon` we need to run `npm install -D nodemon` in terminal. and `-D` is for devDependencies. and it will be added in the `package.json` file in the `devDependencies` section.

• and to run the server with `nodemon` we need to add in the scripts section. `"start": "nodemon server.js"` to run the server.js file. with `npm start` statement in terminal. and it will automatically restart the server when we make changes in the code.

## Hint - Very important

- keep in mind that in `package.json` in script section we have two scripts

  1. `dev` - to run the server in development mode with `nodemon`.
  2. `start` - to run the server in production mode with `node`.

  • and we will use `npm start` to run the server in production mode.

```json
  "scripts": {
    // we will use this script to run the server in development mode with nodemon
    "dev": "nodemon server.js", // for development mode
    "start": "node server.js" // for production mode
  },
```

# make the routes or endpoints of API in `server.js` file more manageable. so we will use the router in routes folder and use it here with a prefix /api/notes which is the base url for all the notes routes.

`server.js`

```js
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

// to make the routes more manageable we will use the router in routes folder and use it here with a prefix /api/notes which is the base url for all the notes routes
app.use('/api/notes', notesRoutes);

// make a get request to this route api/notes and sent a response
// app.get('/api/notes', (req, res) => {
//   res.status(200).send('<h1>You Got 15 Notes</h1>');
// });

// app.post('/api/notes', (req, res) => {
//   res.status(201).json({ message: 'Note created Successfully!' });
// });

// app.put('/api/notes/:id', (req, res) => {
//   res.status(200).json({ message: 'Note updated Successfully!' });
// });

// app.delete('/api/notes/:id', (req, res) => {
//   res.status(200).json({ message: 'Note deleted Successfully!' });
// });

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
```

`routes/notesRoutes.js`

```js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('<h1>You Got 300 Notes</h1>');
});

export default router;
```

# Create Config Folder in it we will create `db.js` file to connect to MongoDB

`src/config/db.js`

- We Need to install `mongoose` to connect to MongoDB
- `npm install mongoose`
- need to install dotenv to use environment variables
- `npm install dotenv`

```js
import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // exit the process after the server is running or exit with failure
  }
};
```

`server.js`

```js
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

// console.log(process.env.MONGODB_URI); // HERE I WILL GET undefined if I don't use dotenv package and use dotenv.config() in server.js file.

const app = express();

// Connect to MongoDB
connectDb();

// to make the routes more manageable we will use the router in routes folder and use it here with a prefix /api/notes which is the base url for all the notes routes
app.use('/api/notes', notesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
```

`.env`

```.env
MONGODB_URI=mongodb+srv://admin:UnHenLWd29OmxYdA@cluster0.romaxsq.mongodb.net/ThinkBoard?retryWrites=true&w=majority&appName=Cluster0
PORT=5001
```

# Create Models Folder in it we will create `Note.js` file to create a schema for Note

• in model in `Note.js` file we will create a schema for Note and export it. the file need to be in singular form and with capitalized first letter.

```js
import mongoose from 'mongoose';

// 1st step: You need to create a schema
// 2nd step: You would create a model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt and updatedAt will be added automatically
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
```

### to parse the body of the request we need to use middleware to parse the body of the request

```js
// middleware to parse the body of the request
app.use(express.json());
```

• `src/server.js`

```js
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

// console.log(process.env.MONGODB_URI); // HERE I WILL GET undefined if I don't use dotenv package and use dotenv.config() in server.js file.

const app = express();

// Connect to MongoDB
connectDb();

// middleware to parse the body of the request
app.use(express.json());

// to make the routes more manageable we will use the router in routes folder and use it here with a prefix /api/notes which is the base url for all the notes routes
app.use('/api/notes', notesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
```

# in controllers folder we will create `notesController.js` file to handle the requests and responses for notes routes.

• `src/Controllers/notesController.js`

```js
import Note from '../models/Note.js';

// getAllNotes Controller to get all notes
export const getAllNotes = async (_, res) => {
  try {
    // const notes = await Note.find(); // find all notes from database
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error('GetAllNotes Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// getNoteById Controller to get a specific note
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id); // find note by id from database

    if (!note) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error('GetNoteById Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// createNote Controller
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    // we will get undefined undefined because we need to use middleware to parse the body of the request
    // we will use express.json() middleware to parse the body of the request
    // console.log(title, content);
    const note = new Note({ title, content }); // create a new note object with title and content properties
    const newNote = await note.save(); // save the new note object in database
    res.status(201).json({ newNote, message: 'Note Created Successfully!' });
  } catch (error) {
    console.error('CreateNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// updateNote Controller
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res
      .status(200)
      .json({ updatedNote, message: 'Note Updated Successfully!' }); // send the updated note object to the client.
  } catch (error) {
    console.error('UpdateNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// deleteNote Controller
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res
      .status(200)
      .json({ deletedNote, message: 'Note Deleted Successfully!' });
  } catch (error) {
    console.error('DeleteNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};
```

```























```

#### Middleware

```js
// middleware to parse the body of the request
app.use(express.json());

// custom middleware to log the request before sent the response
app.use((req, res, next) => {
  console.log('Request received!', `${req.method} ${req.url}`);
  next();
});
```

- one use cases in middleware is to check if the user is authenticated or not. if not authenticated then we will send a response to the client that the user is not authenticated. and if authenticated then we will call the next middleware.

- and is rate limiting is also a use case of middleware.

- to use rate limiting we need to install `express-rate-limit` package.
- `npm install express-rate-limit`

```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## upstash - Redis

- upstash is a redis database. we can use it to store the rate limit for each user. and for caching we can use redis.

- to install upstash we need to install `upstash` package.
- `npm install upstash`

- to install rate limiting in upstash we can use `upstash/rate-limit` package.
- `npm install @upstash/rate-limit`

```js
import { RateLimit } from '@upstash/rate-limit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const rateLimit = new RateLimit({
  redis,
  limiter: 'sliding',
  window: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(rateLimit.middleware());
```

- i install this package `npm i @upstash/ratelimit @upstash/redis` used for rate limiting and caching.
