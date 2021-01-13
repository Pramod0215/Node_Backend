const NewUser = require('../Controller/auth');

exports.signUp =async function(req, res, next) {
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
}