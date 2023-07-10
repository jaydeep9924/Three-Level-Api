
const student = require('../../model/student');
const faculty = require('../../model/faculty');
const token = require('jsonwebtoken');

module.exports.addStudent = async (req,res)=>{

  let check = await student.findOne({email : req.body.email});
  if(check){
    res.json({status : 400, msg : 'Email Allready Exist'})
  }
  else{
    if(req.body.password == req.body.con_pass){
      let facultyid = await faculty.findById(req.body.faculty_id);
      if(facultyid){
    
        let data = await student(req.body)
        data.save();

        if(data){
          let find = await faculty.findById(data.faculty_id);
          await find.student_id.push(data.id);

          let update = await faculty.findByIdAndUpdate(find.id,{student_id : find.student_id});
          if(update){
            res.json({status : 200, msg : 'Student Register Succesfully'})
          }
          else{
            res.json({status : 400, msg : 'Something Wrong'})
          }
        }
        else{
          res.json({status : 400, msg : 'Something Wrong'})
        }
      }
      else{
        res.json({status : 400, msg : 'Faculty Not found Or Enter Valid FacultyId'})
      }
    }
    else{
      res.json({status : 400, msg : 'Enter Same Password'})
    }
  }
};

module.exports.studentlogin = async (req,res)=>{

  let data = await student.findOne({email : req.body.email});
  if(data){
    if(data.password == req.body.password){
      let token_genrate = token.sign({'student' : data},'ad',{expiresIn : 60*60});
      res.json({status : 200, msg : 'Login Successfully', token : token_genrate});
    }
    else{
      res.json({status : 400, msg : 'Enter Valid password'})
    }
  }
  else{
    res.json({status : 400, msg : 'Email Not Found'})
  }
};

module.exports.studentdata = async (req,res)=>{
  let data = await student.find({});
  if(data){
    res.json({status : 200, data : data})
  }
  else{
    res.json({status : 400, msg : 'Something wrong'});
  }
};

module.exports.studentDelete = async (req,res)=>{
  let data = await student.findByIdAndDelete(req.params.id);
  if(data){
    res.json({status : 200, msg : 'Student Deleted'});
  }
  else{
    res.json({status : 400, msg : 'Something wrong'});
  }
};