
const express = require('express');
const port = 8010;
const app = express();

app.use(express.urlencoded());
const passport = require('passport')

// const db = require('./config/mongoose');
const mongoose = require('mongoose')

const url = `mongodb+srv://jaydeepatel:Jaydeep123@cluster0.bscpzyc.mongodb.net/Three_Level_Api?retryWrites=true&w=majority`;

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const passport_jwt = require('./config/passport_jwt');

const session = require('express-session');

app.use(session({
  name : 'admin',
  secret : 'admindata',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000*60*60
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes/admin'));

app.listen(port,(err)=>{
  if(err){
    console.log('Server is Not Connected');
    return false;
  }
  console.log('Server Is Connected on port ',port);
});