const Express = require("express");
const BodyParser = require("body-parser");
const bycrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var app = Express();
app.use(Express.json())
const port = process.env.Port || 8080;
require('./Database/register')
const router = Express.Router()
const NewUser = require('./Database/register')




app.post('/register', async function(req, res, next) {
    const emailExist = await NewUser.findOne({ email: req.body.email })
    if (emailExist) {
        res.status(400).json({ "error": 'Email already Exist' })
    } const salt = await bycrypt.genSalt(10);
    hashpassword = await bycrypt.hash(req.body.password, salt)
    const user = new NewUser({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })
    try {
        const token = await user.generateAuthToken();
        console.log(token)
        const userSignup = await user.save()
        res.status(201);
        res.send({"Status":201,"message":"Register Successfully","token":token});
        let transporter = nodemailer.createTransport({
            host:'mail.jithvar.com',
            port:587,
            secure:true,
            auth:{
                user:'pramod.ray@jithvar.com',
                pass:'Jithvar@123'
            },
        });
        let mailOptions = {
            form:'pramod.ray@jithvar.com',
            to:'abhinav@jithvar.com',
            subject:'Verify Email ',
            text:'Hi,'
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                send(error)
            }
            else{
                send("Email Sent",info.response)
            }
        })

    }

    catch (err) {
        res.status(400).json({ 'error': err })
    }
})

// Login check
app.post('/login', async(req,res)=>{
    console.log('hi')
    try{
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await NewUser.findOne({email:email})
    const isMatch = await bycrypt.compare(password,userEmail.password);
    if(isMatch){
      const token = await userEmail.generateAuthToken();
        res.send({"token":token,"status":200,"message":"Login is Successfully"});
        // const data = new User(req.body)
        userEmail.save();
        
    }
    else{
        res.send('Invalid Password');
    }
    }
    catch(error){
        res.status(400).send('invalid details');
    }
    
})
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200, // For legacy browser support
//     methods: "GET, PUT","DELETE"
// }


app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.listen(port, () => { console.log('running at 8080') });
app.set(port)