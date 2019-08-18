const mongoose = require('mongoose');
const User = mongoose.model('User');
const Plan = mongoose.model('Plan');
const _ = require('lodash');


module.exports.Plan = (req, res, next) => {
    Plan.aggregate([{
            $match: {
                GoalType: req.params.goal
            }
        }, {
            $lookup: {
                from: "User",
                localField: "Coach",
                foreignField: "_id",
                as: "CoachDetails"
            }
        }, {
            $project: {
                Duration: 1,
                Price: 1,
                CoachDetails: {
                    _id: 1,
                    FirstName: 1,
                    LastName: 1,
                    Bio : 1
                }
            }
        }, {
            $unwind: "$CoachDetails"
        }],
        function (err, data) {
            console.log(JSON.stringify(data))
            res.status(200).send(data);
        })
}