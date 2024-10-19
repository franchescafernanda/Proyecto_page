require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const {pool, data_init_base} = require('./db');
app.use((req, res, next) => {
  req.db = pool;
  next();
});

const apiRoutes = require('./src/routes/apiRoutes');
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  try {
    await data_init_base()
    console.log(`Server running on port ${PORT}`)
  } catch (error) {
    console.log(error)
  } 
  ;
});

module.exports = app;