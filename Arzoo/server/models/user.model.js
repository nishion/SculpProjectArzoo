const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'Full name name can\'t be empty'
    },
    lname: {
        type: String,
        required: 'last name can\'t be empty'
    },
    countrycode: {
        type: String,
        required: 'coyntrycode name can\'t be empty'
    },
    mobile: {
        type: String,
        required: 'mobile name can\'t be empty'
    },
    email: {
        type: String,
        required: 'email name can\'t be empty'
    },

    password: {
        type: String,
        required: 'password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    confirmpass: {
        type: String,
        required: 'Password can\'t be empty',
    },
    userType: {
        type: String,
        required: 'type name can\'t be empty'
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);