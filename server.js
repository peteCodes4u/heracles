require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(routes);