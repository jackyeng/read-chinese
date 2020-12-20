const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //connect to mongodb database

require('dotenv').config(); //configure environment

const app = express();
const port = process.env.PORT || 5000; //port/server

app.use(cors()); //middleware
app.use(express.json()); //parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const chineseRouter = require('./routes/chinese');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/chinese', chineseRouter)

app.listen(port, () => { //starts server
    console.log(`Server is running on port: ${port}`);
})