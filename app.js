const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
app.use(Express.json())
const port = process.env.Port || 3000;
require('./Database/conn')
const DbSchema = require('./Database/conn')
// const DbSchema = require('./Database/conn')
 app.post('/upload/resume',(req,res)=>{
     const data= new DbSchema(req.body)
     console.log(req.body)
     data.save().then(()=>{
         res.status(201);
         res.send('Uploaded successfully!')
     }).catch((err)=>{
         res.status(400);
         res.send(err)
     })
 })

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.listen(port, () => {console.log('running at 3000')});
