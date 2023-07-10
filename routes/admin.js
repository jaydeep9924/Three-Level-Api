
const express = require('express');

const router = express.Router();
const passport_check = require('../config/passport_jwt');
const adminCon = require('../controller/admin');
const admin = require('../model/admindata');

router.post('/admindata', admin.imguploaded,adminCon.admindata);
router.get('/getadmindata',passport_check.authenticate('admin',{failureRedirect : '/loginpage'}), adminCon.getadmindata);
router.delete('/deleteadmin/:id', passport_check.authenticate('admin',{failureRedirect : '/loginpage'}), adminCon.deleteadmin);

router.get('/loginpage', (req,res)=>{
  res.json({status : 400, msg : 'Login Required'})
});

router.post ('/login',  adminCon.login);
router.use('/faculty',require('../routes/v1/facultyRouter'));
router.use('/student',require('../routes/v1/studentRouter'));

module.exports = router;


