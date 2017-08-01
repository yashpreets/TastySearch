global.config = require('./global.config');
var express = require("express"),
    env = "DEVELOPMENT",
    requestLogger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    helmet = require("helmet"),
    app = express(),
    routerObj = require("./router.js");
    
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());


routerObj.router(app);

startServer();

/*************************************** START NODE SERVER ************************************/
/******************************************************************************************************/
function startServer(){
    app.listen(global.config.settings.port, function () {
        console.log("server started");
    }).on('error', function (e) {
        console.log("Got following error while starting application, hence aborting application start");
        console.log(e);
    }); 
}


module.exports = app;