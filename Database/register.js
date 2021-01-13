
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
// mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/Jobs',{useNewUrlParser:true,
useCreateIndex:true, useFindAndModify:true, 
useUnifiedTopology:true}).then(()=>{console.log('sucess')})
.catch((err)=>{console.log(err)})
// create schema
const regSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 200,
      },  email: {
        type: String,
        required: true,
        unique: true,
      },  password: {
        type: String,
        required: true,
        min: 5
      },
      tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

},{timestamps: true}
)
// const loginSchema= new mongoose.Schema({
//   // name: {
//   //     type: String,
//   //     required: true,
//   //     max: 200,
//   //   },  
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },  
//     password: {
//       type: String,
//       required: true,
//       min: 5
//     },
//     tokens:[{
//         token:{
//             type:String,
//             required:true
//         }
//     }]

// },{timestamps: true}
// )
regSchema.methods.generateAuthToken = async function(){
console.log('jwttoken',this._id)
try{
  const token = jwt.sign({_id:this._id},'anyStringyuweyyuweyuewyuweuewewyuewyuweyuewyuewyewyyuewyuew');
  this.tokens = this.tokens.concat({token:token})
  return token;
}
  catch(error){
    console.log(error)
  }
}

// create collections
const NewUser = new mongoose.model('Register',regSchema);
// const User = new mongoose.model('Login',loginSchema)
module.exports = NewUser