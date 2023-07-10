
const admin = require('../model/admindata');

const passport_jwt = require('jsonwebtoken');


module.exports.admindata = async (req,res)=>{

  let check = await admin.findOne({email : req.body.email});
  if(check){
    res.json({status : 400, msg : "Email is Allready Exist"});
  }
  else{
    var singleimg = '';
    if(req.files.images){
      singleimg = admin.singleimg+'/'+req.files.images[0].filename;
    }
  
    var multimgstore = [];
    if(req.files.multimg){
      for(var i=0; i<req.files.multimg.length; i++){
        multimgstore.push(admin.multimg+'/'+req.files.multimg[i].filename);
      }
    }
  
    req.body.images = singleimg;
    req.body.multimg = multimgstore;
    req.body.role = 'Admin';
  
    let data = await admin(req.body);
    data.save();
  
    if(data){
      res.json({status : 200, message : "Admin Data ia Added"})
    }
    else{
      res.json({status : 400, message : "Something Wrong"})
    }
  }
}

module.exports.getadmindata = async (req,res)=>{

  let data = await admin.find({}).populate('facluty_id').exec();
  if(data){
    res.json({status : 200, data : data});
  }
  else{
    res.json({status : 400, msg : 'Something Wrong'});
  }
};

module.exports.deleteadmin = async (req,res)=>{

  let find = await admin.findById(req.params.id);
  if(find){
    let data = await admin.findByIdAndDelete(find.id);
    if(data){
      res.json({status : 200, msg : 'Admin Deleted'});
    }
    else{
      res.json({status : 400, msg : 'Something Wrong'});
    }
  }
  else{
    res.json({status : 400, msg : 'Admin Record Not Found'});
  }
};

module.exports.login = async (req,res)=>{

  let find = await admin.findOne({email : req.body.email});
  if(find){
    if(find.password == req.body.password){
      var token = passport_jwt.sign({ 'admin': find}, 'ad', { expiresIn: 60 * 60 });
      res.json({status : 200, msg : 'Token Genrate Successfully', token : token})
    }
    else{
      res.json({status : 400, msg : 'Enter Correct Password'});
    }
  }
  else{
    res.json({status : 400, msg : 'Record Not Found'});
  }
  
}