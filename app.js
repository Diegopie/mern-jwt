const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cookieParser());
// use the body parser in express to translate json
app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/mernAuthJwt', { useNewUrlParser: true }, ()=> {
    console.log('Connected to DB!');
});

app.listen(5000, ()=> {
    console.log('Express Server Running');
});