require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const { connectMongoDB } = require('./connection');
app.use(bodyParser.json());
app.use(cors());


app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use(express.urlencoded({ extended: true }));

connectMongoDB(http, 5000);
