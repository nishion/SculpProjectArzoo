const DB = require('../../Server/DBConnection.js');
var User = require('../../Server/models/user');
var Plan = require('../../Server/models/plan');
// var tmp = "9657663844"
User.find()
// DB.collection('Enroll').aggregate([{
//     $lookup: {
//         from: "User",
//         localField: "User",
//         foreignField: "_id",
//         as: "UserDetails"
//     }
// },{
//     $lookup: {
//         from: "User",
//         localField: "Coach",
//         foreignField: "_id",
//         as: "CoachDetails"
//     }
// },{
//     $project : {
//         UserDetails : {
//             FirstName : 1,
//             LastName : 1,
//             MobileNo : 1
//         },
//         CoachDetails : {
//             MobileNo : 1,
//             Email : 1
//         }
//     }
// },{
//     $unwind : "$UserDetails"
// },{
//     $unwind : "$CoachDetails"
// }

// ], function (err, res) {
//     res.toArray(function(err,i){
//       let tmp = i[0]
//       console.log(tmp.UserDetails.MobileNo);
//     })
// })
// // Plan.aggregate([{
// //             $match: {
// //                 GoalType: "Stamina"
// //             }
// //         }, {
// //             $lookup: {
// //                 from: "User",
// //                 localField: "Coach",
// //                 foreignField: "_id",
// //                 as: "CoachDetails"
// //             }
// //         },{
// //             $project : {
// //                 Duration : 1,
// //                 Price : 1,
// //                 CoachDetails : {
// //                     _id : 1,
// //                     FirstName : 1,
// //                     LastName : 1
// //                 }
// //             }
// //         },{
// //             $unwind : "$CoachDetails"
// //         }
// //     ],
// //     function (err, res) {
// //         console.log(JSON.stringify(res));
// //     })











// // // User.findOne({
// // //     MobileNo: 9657663844, UserType:"U"
// // // }, {
// // //     _id: 1
// // // }, function (err, res) {
// // //     console.log(JSON.stringify(res));

// // // })