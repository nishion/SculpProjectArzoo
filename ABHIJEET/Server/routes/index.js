const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlPlan = require('../controllers/plan.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/OTP', ctrlUser.OTP);
router.post('/update', jwtHelper.verifyJwtToken, ctrlUser.updateUser);
router.get('/plan/:goal', ctrlPlan.Plan);
router.get('/myPlan', jwtHelper.verifyJwtToken, ctrlUser.myPlan);
router.get('/update', jwtHelper.verifyJwtToken, ctrlUser.update);

module.exports = router;