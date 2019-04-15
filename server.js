const hostname = '127.0.0.1';
const port = 3000;
/*Constants that store details for the authorization API okta.com*/
const authClientID = "0oag1yxo1EKOXWZ5B356";
const authClientSecret = "INhXV5J2ZZLBhPr1cWi-vzc0q3xpFBsvknhPf4v";
const authToken = "007siEwzxgmLwaotSw149a4ZTrJ0o-G5nqT5a6-dQB";
const oktaURL = "https://dev-299193.okta.com";
const authServ = "https://dev-299193.okta.com/oauth2/default/v1/authorize";


const session = require("express-session");
const express = require('express'); //Framework used for server
const bodyParser = require('body-parser'); //Middleware used to handle JSON, Field Submissions and other data
const logger = require('morgan'); //Middleware used to keep logs
const request = require('request');
var multer  = require('multer'); //Middleware that handles multipart forms
var upload = multer();

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(session({
    secret: 'wedriudhfiuaYHGHWEIUHDWUEYDFHBWIUHGUIUG88838888888888333PLEASEDONTHACKME uWu',
    resave: true,
    saveUninitialized: false
}));
app.use(express.static('client'));
async function newUser(email, password, charname, callback){  //Creates a new user using the OKTA authentication server
    let options = {
        url: oktaURL + '/api/v1/users',
        json: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "SSWS "+authToken
        },
        body: {

            profile: {
                login: email,
                email: email,
                displayName: charname
            },
            credentials: {
                "password": password
            }
        }
    };
    await request.post(options, (err, res, body) => {
        if (err || body.errorCode) {
            if (body.errorCode) {
                console.log(body);
                err=body.errorCauses[0].errorSummary.toString();
                console.log(err)
            } else {
            console.log("USER FAILED TO CREATE, ERROR: " +err); }
            callback(false, err)
        } else {
            console.log("USER CREATED");
            callback(true)
        }


    });
}
async function loginUser(username, password, callback) {
    let options = {
        url: oktaURL + "/api/v1/authn",
        json: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: {
            "username": username,
            "password": password,
        }
    };
    await request.post(options, (err, res, body) => {
        if (err || body.errorCode) {
            if (body.errorCode) {
                console.log(body);
                err = body.errorSummary.toString();
                console.log(err)
            } else {
                console.log("LOGIN FAILED, ERROR: " + err);
            }
            callback(false, err)
        } else {
            console.log(body);
            console.log("LOGIN SUCCESSFUL, SESSION TOKEN: " + body.sessionToken.toString());
            callback(body.sessionToken)
        }
    });
}

app.get('/random/:max', function(req, resp){
    max = parseInt(req.params.max);
    rand = Math.floor(Math.random()*max) +1;
    console.log('Max via url is ' + max + ' rand is ' + rand);
    resp.send('' + rand)
});

app.get('/r', function(req, resp){
    max = parseInt(req.query.max);
    rand = Math.floor(Math.random()*max) +1;
    console.log('Max via query is ' + max + ' rand is ' + rand);
    resp.send('' + rand)
});

app.post("/login", upload.none(), function(req, resp){
    console.log("LOGIN ATTEMPT DETECTED");
    let email =  req.body.email;
    let password = req.body.password;
    loginUser(email, password, function callback(status, token){
        if (status){
            console.log("SENDING TOKEN: "+token);
            resp.send(token)}
        else {
            console.log("SENDING LOGIN ERROR");
            resp.status(401).send()
        }
    })
});



app.post("/signup", upload.none(), function(req, resp){
    let email =  req.body.email;
    let password = req.body.password;
    let charname = req.body.charname;
    newUser(email, password, charname, function(status, err=null){
        if (status===false) {
            resp.status(422);
            console.log("SENDING ERROR: "+err);
            resp.send(err)
        } else {
            resp.status(201);
            resp.send("Creation Successful")
        }

    })
});

app.listen(port);
console.log("SERVER RUNNING");