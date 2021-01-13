const mongoose = require('mongoose');
// mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/resume',{useNewUrlParser:true,
useCreateIndex:true, useFindAndModify:true, 
useUnifiedTopology:true}).then(()=>{console.log('sucess')})
.catch((err)=>{console.log(err)})
// create schema

