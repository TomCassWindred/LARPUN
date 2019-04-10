const hostname = '127.0.0.1';
const port = 3000;
/*Constants that store details for the authorization API okta.com*/
const authClientID = "0oag1yxo1EKOXWZ5B356";
const authClientSecret = "INhXV5J2ZZLBhPr1cWi-vzc0q3xpFBsvknhPf4v";
const authToken = "007siEwzxgmLwaotSw149a4ZTrJ0o-G5nqT5a6-dQB";


var session = require("express-session");
const express = require('express'); //Framework used for server
const bodyParser = require('body-parser'); //Middleware used to handle JSON, Field Submissions and other data
const logger = require('morgan'); //Middleware used to keep logs
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

let app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());



//The following section manages login using the Okla API wrapper
const okta = require('@okta/okta-sdk-nodejs'); //Manages login
const oktaClient = new okta.Client({
    orgUrl: 'https://dev-299193.okta.com',
    token: authToken
});
const oidc = new ExpressOIDC({
    issuer: "https://dev-299193.okta.com/oauth2/default",
    client_id: authClientID,
    client_secret: authClientSecret,
    redirect_uri: 'http://localhost:3000/users/callback',
    appBaseUrl: 'https://dev-299193.okta.com',
    scope: "openid profile",
    routes: {
        login: {
            path: "/users/login"
        },
        callback: {
            path: "/users/callback",
            defaultRedirect: "/dashboard"
        }
    }
});
app.use(session({
    secret: 'wedriudhfiuaYHGHWEIUHDWUEYDFHBWIUHGUIUG88838888888888333PLEASEDONTHACKME uWu',
    resave: true,
    saveUninitialized: false
}));


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
    let email =  req.body.email;
    let password = req.body.password;
    const newUser = {
        profile: {
            email: email,
            login: email,
        },
        credentials: {
            password : {
                value: password
            }
        }
    };

     client.createUser(newUser)
        .then(user => {
            console.log('Created user', user);
        }).catch(console.error);
    console.log("Form received, returning "+ req.body.username);
    resp.redirect('userpage.html');

});

app.listen(port);
console.log("SERVER RUNNING");