const mongoose = require('mongoose');
const User = mongoose.model('User');
const Plan = mongoose.model('Plan');
const _ = require('lodash');


module.exports.Plan = (req, res, next) => {
   res.status(200).send("PlanDetails");
}