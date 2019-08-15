const mongoose = require('mongoose');


var planSchema = new mongoose.Schema({
    Duration : {
        type : Number
    },
    GoalType : {
        type : String
    },
    Price : {
        type : Number
    },
    Coach : {
        type : String
    }
})
mongoose.model('Plan', planSchema, "Plan");