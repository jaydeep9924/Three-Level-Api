
const express = require('express');

const router = express.Router();
const facultyCon = require('../../controller/v1/facultyController');
const passport_check =  require('passport');

router.post('/facultyregister',passport_check.authenticate('admin',{failureRedirect : '/loginpage'}), facultyCon.facultyregister);
router.post('/facultylogin', facultyCon.facultylogin);
router.get('/facultydata',passport_check.authenticate('faculty',{failureRedirect : '/loginpage'}) ,facultyCon.facultydata);
router.delete('/facultydelete/:id', passport_check.authenticate('faculty',{failureRedirect : '/loginpage'}) ,facultyCon.facultydelete);

module.exports = router;

