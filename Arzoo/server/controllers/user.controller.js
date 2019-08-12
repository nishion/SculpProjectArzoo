const mongoose = require('mongoose');

const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.countrycode = req.body.countrycode;
    user.mobile = req.body.mobile;
    user.email = req.body.email;
    user.password = req.body.password;
    user.confirmpass = req.body.confirmpass;
    user.userType = req.body.userType;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) {
                console.log('Duplicate email adrress found.');
                res.status(422).send(['Duplicate email adrress found.']);
            } else
                return next(err);
        }

    });
    console.log('inside');
}
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fname', 'mobile']) });
        }
    );
}