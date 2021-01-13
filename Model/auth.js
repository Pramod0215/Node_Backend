const mongoose = require('mongoose');
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

},{timestamps: true})
const NewUser = new mongoose.model('Register',regSchema);
module.exports = NewUser