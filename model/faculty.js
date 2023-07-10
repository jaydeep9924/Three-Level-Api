
const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  admin_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'admindata',
    required : true,
  },
  student_id : {
    type : Array,
    ref : 'student',
    required : true,
  }
});

const faculty = mongoose.model('faculty', facultySchema);

module.exports = faculty;