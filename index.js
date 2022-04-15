const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const connection = require('./config/db');
const postRouter = require('./routes/postroutes');

const app = express();

connection();
app.use(cors());
app.use(bodyParser.json());
app.use('/', postRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running on port no ${PORT}`);
})