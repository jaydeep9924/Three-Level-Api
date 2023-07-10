const { default: mongoose } = require('mongoose');
const mongoode= require('mongoose');

const studentSchema = mongoode.Schema({
  name :{
    type : String,
    required : true
  },
  email :{
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  faculty_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref  : 'faculty',
    required : true
  }
});

const student = mongoose.model('student',studentSchema);

module.exports = student;