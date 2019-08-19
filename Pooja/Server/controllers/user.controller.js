const mongoose = require('mongoose');
const MailModule = require('../config/mailModule');

const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.CountryCode = req.body.CountryCode;
    user.MobileNo = req.body.MobileNo;
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    user.ConfirmPassword = req.body.ConfirmPassword;
    user.UserType = req.body.UserType;
    console.log(JSON.stringify(req.body));
    user.save((err, doc) => {
        if (!err)
            res.status(200).send(doc);
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
    passport.authenticate('local', (err, User, info) => {
        // error from passport middleware
        console.log(JSON.stringify(User), " D", JSON.stringify(info));
        if (err) return res.status(400).json(err);
        // registered user
        else if (User) return res.status(200).json({
            "token": User.generateJwt()
        });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({
            _id: req._id
        },
        (err, user) => {
            if (!user)
                return res.status(404).json({
                    status: false,
                    message: 'User record not found.'
                });
            else
            
                return res.status(200).json({
                    status: true,
                    user: _.pick(user, ['FirstName', 'LastName', 'MobileNo', 'Email', 'CountryCode', 'UserType','Password','ConfirmPassword'])
                }); // Userdetails to show
        }
    );
}

//sendOTP to mail and return as res
module.exports.OTP = (req, res, next)=> {
    res.status(200).send(MailModule.verifyOTP(req.body.Email).toString());
}

module.exports.updateUser = (req, res, next)=> {
    //console.log("Query: ",JSON.stringify(req.query),"\nBody:",JSON.stringify(req.body),"\nREQ:",JSON.stringify(req._id));
    User.updateOne({_id:req._id},{$set : req.body},function(err){
        if(err){console.log(err);
        res.status(200).send(err)}
        else{
            res.status(200).send("OK")
        }
    });
    
    
    
    
   
}