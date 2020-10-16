require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const userRouter = require('./users/user-router');
const statusRouter = require('./status/status-router');
const aliensRouter = require('./aliens/aliens-router');
const alienInventoryRouter = require('./inventories/alien-inventory-router');
const structuresRouter = require('./structures/structures-router');
const structureInventoryRouter = require('./inventories/structure-inventory-router');
const commitRouter = require('./commit/commit-router');


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/status', statusRouter);
app.use('/api/aliens', aliensRouter);
app.use('/api/alienInventory', alienInventoryRouter);
app.use('/api/structures', structuresRouter);
app.use('/api/structureInventory', structureInventoryRouter);
app.use('/api/commit', commitRouter);

app.get('/', (req, res) => {
  res.send('MARTIAN BROOD SERVER')
});

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
  });

module.exports = app;