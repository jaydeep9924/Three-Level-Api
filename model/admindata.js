const mongoose =  require('mongoose');

const path = require('path');
const multer = require('multer');
const adminsinglepath = '/images/adminsingleimg';
const adminmultimgpath = '/images/adminmultimg';

const dataschema = mongoose.Schema({
  name :{
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  hobby : {
    type : Array,
    required : true
  },
  desc : {
    type : String,
    required : true
  },
  images : {
    type : String,
    required : true
  },
  multimg : {
    type : Array,
    required : true
  },
  role : {
    type : String,
    required : true,
  },
  facluty_id : {
    type : Array,
    ref : 'faculty',
    required : true,
  }
});

const imgstorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    if(file.fieldname == 'images'){
      cb (null, path.join(__dirname,'..',adminsinglepath));
    }
    else{
      cb (null, path.join(__dirname,'..',adminmultimgpath));
    }
  },
  filename : (req,file,cb)=>{
    cb (null, file.fieldname+'-'+Math.floor(Math.random()*100))
  }
});

dataschema.statics.imguploaded = multer({storage : imgstorage}).fields([{name : 'images', maxCount : 1},{name : 'multimg', maxCount : 5}]);
dataschema.statics.singleimg = adminsinglepath;
dataschema.statics.multimg = adminmultimgpath;

const admindata = mongoose.model('admindata',dataschema);
module.exports = admindata;