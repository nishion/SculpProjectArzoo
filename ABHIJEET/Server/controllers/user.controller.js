const mongoose = require('mongoose');
const notificationModule = require('../config/notificationModule');
const DB = require('../models/db');
const User = mongoose.model('User');
const Enroll = mongoose.model('Enroll');
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
console.log(JSON.stringify(req.query),"Body",JSON.stringify(req.body))
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
                user: _.pick(user, ['FirstName', 'LastName', 'MobileNo', 'Email', 'CountryCode', 'UserType', 'Password', 'ConfirmPassword'])
            }); // Userdetails to show
        }
    );
}

//sendOTP to mail and return as res
module.exports.OTP = (req, res, next) => {
    let mailOTP = notificationModule.verifyMailOTP(req.body.Email.toString()).toString();
    let smsOTP = notificationModule.verifySMSOTP(req.body.Mobile.toString()).toString();
    res.status(200).json({"mailOTP":mailOTP,"smsOTP":smsOTP});
}

module.exports.updateUser = (req, res, next) => {
    
    User.updateOne({ _id: req._id }, { $set: req.body }, function(err) {
        if (err) {
            console.log(err);
            res.status(200).send(err)
        } else {
            res.status(200).send("OK")
        }
    });

}

module.exports.myPlan = (req, res, next) => {
    console.log(JSON.stringify(req.body),JSON.stringify(req._id))
    Enroll.aggregate([{
                $match: {
                    User: mongoose.Types.ObjectId(req._id)
                }
            }, {
                $lookup: {
                    from: "User",
                    localField: "Coach",
                    foreignField: "_id",
                    as: "CoachDetails"

                }

            },
            {
                $lookup: {
                    from: "Plan",
                    localField: "Plan",
                    foreignField: "_id",
                    as: "PlanDetail"
                }

            },
            {
                $project: {
                    _id: 0,
                    User: 0,
                    Plan: 0,
                    Coach: 0,

                    PlanDetail: {
                        _id: 0,
                        Coach: 0

                    },
                    CoachDetails: {
                        _id: 0,
                        MobileNo: 0,
                        Email: 0,
                        CountryCode: 0,
                        UserType: 0,
                        Password: 0,
                        ConfirmPassword : 0
                    }
                }
            },
            {
                $unwind: "$CoachDetails"
            },{
                $unwind : "$PlanDetail"
            }
        ],
        function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(JSON.stringify(data));
            res.status(200).send(data)
        });
}

module.exports.update = (req, res, next) => {
    console.log(JSON.stringify(req.body),JSON.stringify(req._id))
    Enroll.aggregate([{
        $match : {
            User : mongoose.Types.ObjectId(req._id)
        }
    },{
        $lookup: {
            from: "User",
            localField: "User",
            foreignField: "_id",
            as: "UserDetails"
        }
    },{
        $lookup: {
            from: "User",
            localField: "Coach",
            foreignField: "_id",
            as: "CoachDetails"
        }
    },{
        $project : {
            UserDetails : {
                FirstName : 1,
                LastName : 1,
                MobileNo : 1
            },
            CoachDetails : {
                MobileNo : 1,
                Email : 1
            }
        }
    },{
        $unwind : "$UserDetails"
    },{
        $unwind : "$CoachDetails"
    }
    ], function (err, data) {
        let Details = data[0];
        let UserName = Details.UserDetails.FirstName + " " + Details.UserDetails.LastName; 
        let UserMobile = Details.UserDetails.MobileNo.toString();
        let CoachMobile = Details.CoachDetails.MobileNo.toString();
        let CoachMail =  Details.CoachDetails.Email.toString();
        notificationModule.sendMail(CoachMail, UserName + " Updated", "User "+UserName+" Updated his status. \n User Mobile No : "+ UserMobile);
        notificationModule.sendText(CoachMobile,"User "+UserName+" Status updated Mobile : "+UserMobile);
        res.status(200).send("OK");
    })

}