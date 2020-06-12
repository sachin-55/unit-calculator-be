require('@babel/polyfill');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./index');

dotenv.config({ path: `${__dirname}/../config.env` });

// Database Connection
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DBNAME>', process.env.DATABASE_NAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connection Success 👍 💁 💯'));

// Server Setup
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT} 👍 💯`);
});
