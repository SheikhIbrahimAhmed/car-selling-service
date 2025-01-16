const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const loginMiddleware = require('./middleware/loginMiddleware');
const { connectMongoDB } = require('./connection');
const path = require('path');
app.use(bodyParser.json());
app.use(cors());


connectMongoDB();


http.listen(5000, function () {
    console.log("Backend is running on port 5000");
});


app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);



app.use(express.urlencoded({ extended: true }));
