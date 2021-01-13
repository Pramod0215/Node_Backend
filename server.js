const Express = require("express");
var cors = require('cors')
var app = Express();
app.use(Express.json())
const port = process.env.Port || 8080;
require('./Database/db')

const jobRoute = require('./router/router')
app.use('/api',jobRoute)
app.use(function( req, res, next ) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1000000000");
    // intercept OPTIONS method 
    if ('OPTIONS' == req.method) { res.send(200); } else { next(); } });

app.use(cors());
app.listen(port, () => { console.log('running at 8080') });
app.set(port)