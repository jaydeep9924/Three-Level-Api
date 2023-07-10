const mongoose =  require('mongoose');

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
    type : Number,
    required : true
  }
});

const data = mongoose.model('data',dataschema);

module.exports = data;