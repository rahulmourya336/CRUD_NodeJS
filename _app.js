/* eslint-disable indent */
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const http = require('http');

const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const API_PREFIX = require('./public/config/APIVersion');


require('./public/config/DBConnection');


const Users = require('./public/models/TRIP_Models/trip_users');
const authRouter = require('./public/routes/authRouter')(Users);

const trips = require('./public/models/TRIP_Models/trip_list');
const tripRouter = require('./public/routes/tripRouter')(trips);


/* Variable Declaration */
const app = express();
app.use(bodyParser());

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/trip`, tripRouter);

const PORT = process.env.PORT || 4500;

app.use((req, res) => {
    res.status(404);
    res.send('Invalid API Route');
});


app.listen(PORT, () => {
    console.log(`Listening on port ${chalk.green(PORT)}`);
});
