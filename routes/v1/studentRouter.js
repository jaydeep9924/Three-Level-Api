const express = require('express');

const router = express.Router();
const studentCon = require('../../controller/v1/studentcontroller');
const passport_check =  require('passport');


router.post('/addStudent', passport_check.authenticate('faculty',{failureRedirect : '/loginpage'}) ,studentCon.addStudent);
router.post('/studentlogin', studentCon.studentlogin);
router.get('/studentdata', passport_check.authenticate('student',{failureRedirect : '/loginpage'}),studentCon.studentdata);
router.delete('/studentDelete/:id', passport_check.authenticate('student',{failureRedirect : '/loginpage'}),studentCon.studentDelete);
module.exports = router;