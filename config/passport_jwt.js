  
  const passport = require('passport');
  const admin = require('../model/admindata');
  const faculty = require('../model/faculty');
  const student = require('../model/student')

  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;

  var opts = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'ad';


  passport.use('admin',new JwtStrategy(opts,async function(jwt_payload, done) {
 
    let admindata = await admin.findOne({email : jwt_payload.admin.email});
    if(admindata){
      if(admindata.password == jwt_payload.admin.password){
        return done(null, admindata);
      }
      else{
        return done(null, false);
      }
    }
    else{
      return done(null, false);
    }
  }));

passport.use('faculty',new JwtStrategy(opts, async function(jwt_payload, done) {

  let facultyData = await faculty.findOne({email : jwt_payload.faculty.email});
  if(facultyData){
    if(facultyData.password == jwt_payload.faculty.password){
      return done(null,facultyData);
    }
  }
  else{
    return done(null, false);
  }
  
}));

passport.use('student',new JwtStrategy(opts, async function(jwt_payload, done) {

  let studentData = await student.findOne({email : jwt_payload.student.email});
  if(studentData){
    if(studentData.password == jwt_payload.student.password){
      return done(null,studentData);
    }
  }
  else{
    return done(null, false);
  }
  
}));

  passport.serializeUser((user,done)=>{
    return done(null, user.id)
  });
  
  passport.deserializeUser(async (id,done)=>{
    let find = await admin.findById(id);
    if(find){
      return done(null, find)
    }
    else{
      return done(null , false)
    }
  });

  module.exports =passport;