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

// Server side test of documents
const User = require('./models/User');
const newUser = {
    username: 'Dogpie',
    password: '1234',
    role: 'admin'
};
const user = new User(newUser);

user.save((err, document) => {
    if (err)  console.log(err)
    console.log(document);
})

app.listen(5000, ()=> {
    console.log('Express Server Running');
});