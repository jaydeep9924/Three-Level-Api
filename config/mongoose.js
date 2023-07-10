
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/node-api');

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log('DB is Not Connected');
    return false;
  }
  console.log('DB is Connected');
});

module.exports = db;