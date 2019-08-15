const mongoose = require('mongoose');


var enrollSchema = new mongoose.Schema({
    User: String,
    StartDate: Date,
    EndDate: Date,
    Coach: String,
    Plan: String
})
mongoose.model('Enroll', enrollSchema, "Enroll");