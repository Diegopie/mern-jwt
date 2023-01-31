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
        type: String,
        required: true,
    },
    role: {
        type: String,
        // enum is a validator for String and Number types. It is always an array of options to validate from
        enum: ['user', 'admin'],
        required: true
    },
    // our todos property is an array who's type is an object ID, and it is referring (ref) to our 'Todo' document 
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
})

// Creating a Mongoose pre Hook (like a middleware). This will execute before the document is saved when passing ('save)
//  // Using ES5 function keep us in the scope where we can use 'this'
UserSchema.pre('save', function (next) {
    // Check if a user password has been modified. Modified passwords have already been hashed, so we do not need to encrypt it
    //  // the next() function come from our pre() hook and moves us to the next hook
    if (!this.isModified('password')) return next();

    // .hash(arg1, arg2, arg3): arg1 is the pointing to our password, arg2 is the strength of encryption, arg three is a callback(err, returned-password)
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        // If err end the function but make sure to continue the Hook with next(err)
        // Then replace our password with the hashedPassword and continue the hook with next()
        if (err) return next(err);
        this.password - hashedPassword;
        next();
    })
});

// Mongoose methods allow us to access functions with data from our document
//  // Here, we want to be able to compare passwords received from a client to what is stored in our document
UserSchema.methods.comparePassword = function (password, cb) {
    // Bcrypt allows us to do this with the .compare(arg1, arg2, arg3) function
    //  //  arg1 being the password received from the client, arg2 being our document's hashed password, and arg3 being a callback that where bcrypt will tell us if these match
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return err;
        // If password does not match
        if (!isMatch) return cb(null, isMatch);
        return cb(null, this);
    });
}

module.exports = mongoose.model('User', UserSchema);