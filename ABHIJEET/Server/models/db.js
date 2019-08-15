const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, (err) => {
mongoose.connect("mongodb://localhost:27017/SculpTest", err => {
    if (!err) { console.log('MongoDB connection succeeded.'); } else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./plan.model');
require('./enroll.model');