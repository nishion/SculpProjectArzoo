const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: 'Full name name can\'t be empty'
    },
    LastName: {
        type: String,
        required: 'last name can\'t be empty'
    },
    CountryCode: {
        type: String,
        required: 'coyntrycode name can\'t be empty'
    },
    MobileNo: {
        type: String,
        required: 'mobile name can\'t be empty'
    },
    Email: {
        type: String,
        required: 'email name can\'t be empty'
    },

    Password: {
        type: String,
        required: 'password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    ConfirmPassword: {
        type: String,
        required: 'Password can\'t be emptyCP',
    },
    UserType: {
        type: String,
        required: 'type name can\'t be empty'
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('Email').validate((val) => {
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
    return (password == this.Password) ? true : false; 
    //return bcrypt.compareSync(password, this.Password); // to check encrypted pass only if pass stored is encrypted
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema, "User");