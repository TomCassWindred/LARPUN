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

let app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(session({
    secret: 'wedriudhfiuaYHGHWEIUHDWUEYDFHBWIUHGUIUG88838888888888333PLEASEDONTHACKME uWu',
    resave: true,
    saveUninitialized: false
}));

function newUser(email, password, charname){  //Creates a new user using the OKTA authentication server
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
    request.post(options, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log("newUSERREQUEST SENT");
        console.log(body);
        console.log(body.id);
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

app.post("/login", function(req, resp){
    let username =  req.body.username;
    let password = req.body.password;
    console.log("Form received, returning "+ req.body.username);
    resp.redirect('userpage.html');

});

app.post("/signup", function(req, resp){
    console.log("SIGNUP DETECTED BEEP BOOP");
    console.log(req.body);
    let email =  req.body.email;
    let password = req.body.password;
    let charname = req.body.charname;
    console.log(email);
    newUser(email, password, charname);
    console.log("Form received, returning "+ req.body.username);
    resp.redirect('userpage.html');

});

app.listen(port);
console.log("SERVER RUNNING");