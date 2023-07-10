
const admin = require('../../model/admindata');
const faculty = require('../../model/faculty');

const jwtToken = require('jsonwebtoken');

module.exports.facultyregister = async (req,res)=>{

  let check = await faculty.findOne({email : req.body.email});
  if(check){
    res.json({status : 400, msg : 'Email Allready Exist'});
  }
  else{
    if(req.body.password == req.body.con_password){
      let checkadmin = await admin.findById(req.body.admin_id);
      if(checkadmin){

        let data = await faculty(req.body);
        data.save();
        if(data){
          let find = await admin.findById(data.admin_id);
          await find.facluty_id.push(data.id);

          let update = await admin.findByIdAndUpdate(find.id, {facluty_id:find.facluty_id});
          if(update){
            res.json({status : 200, msg : 'Faculty Added Succesfully'});
          }
          else{
            res.json({status : 400, msg : 'Something Wrong'});
          }
        }
        else{
          res.json({status : 400, msg : 'Something Wrong'});
        }
      }
      else{
        res.json({status : 200, msg : 'Admin Not Found Or Enter Valid Admin ID'});
      }
    }
    else{
      res.json({status : 400, msg : 'Enter Same Password'});
    }
  }
};

module.exports.facultylogin = async (req,res)=>{

  let check = await faculty.findOne({email : req.body.email});
  if(check){
    if(check.password == req.body.password){

      let token = jwtToken.sign({'faculty': check}, 'ad', { expiresIn: 60 * 60 })
      res.json({status : 200, msg : "Login Succesfully", token : token});
    }
    else{
      res.json({status : 400, msg : "Enter Valid Password"});
    }
  }
  else{
    res.json({status : 400, msg : "Enter Valid Email"});
  }
};

module.exports.facultydata = async (req,res)=>{
  let check = await faculty.find({}).populate('student_id').exec();
  if(check){
    res.json({status : 200, data : check});
  }
  else{
    res.json({status : 400, msg : "Something Wrong"});
  }
};

module.exports.facultydelete = async (req,res)=>{
  let check = await faculty.findByIdAndDelete(req.params.id);
  if(check){
    res.json({status : 200, msg : "Deleted Succesfully"});
  }
  else{
    res.json({status : 400, msg : "Something Wrong"});
  }
};