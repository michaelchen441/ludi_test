import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import passport from 'passport';

import db from './models/index.js';
import routes from './routes/index.js';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

const { json, urlencoded } = express;
const { mongoose, uri } = db;

const app = express();

const corsOptions = {
  // origin: isProduction
  //   ? 'https://ludi.cs.illinois.edu'
  //   : 'http://localhost:3000',
  origin: '*',
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json({ limit: '30mb', extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ limit: '30mb', extended: true }));

app.use(passport.initialize());

app.use('/api', routes);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

mongoose.set('useFindAndModify', false);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}.`));
