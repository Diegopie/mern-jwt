const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a document called UserSchema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // Create min/max values of the username string
        min: 6,
        max: 15.
    },
    password: {
        type: string,
        required: true,
    },
    role: {
        type: String,
        // enum is a validator for String and Number types. It is always an array of options to validate from
        enum: ['user', 'admin'],
        required: true
    },
    // our todos property is an array who's type is an object ID, and it is referring (ref) to our 'Todo' document 
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

// Creating a Mongoose pre Hook (like a middleware). This will execute before the document is saved when passing ('save)
//  // Using ES5 function keep us in the scope where we can use 'this'
UserSchema.pre('save', function(next) {
    // Check if a user password has been modified. Modified passwords have already been hashed, so we do not need to encrypt it
    //  // the next() function come from our pre() hook and moves us to the next hook
    if(!this.isModified('password')) return next();
    
    // .hash(arg1, arg2, arg3): arg1 is the pointing to our password, arg2 is the strength of encryption, arg three is a callback(err, returned-password)
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {

    })
});