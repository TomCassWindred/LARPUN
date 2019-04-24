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
const multer = require('multer'); //Middleware that handles multipart forms
const upload = multer();
const fs = require("fs"); //Manages file reading

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

async function initCharacter(charName, userID) { //Initialises a JSON file for the new character
    //Make a version of the character name with no space as it can cause file name issues
    let newFile = "characters/" + userID + ".json";
    //Make a copy of the default.json file so that we can edit it
    fs.copyFileSync('characters/default.json', newFile, (err) => {
        if (err) throw err;
        console.log('JSON FILE CREATION FAILED');
    });

    let fileContent = fs.readFileSync(__dirname + "/" + newFile); //Read the newly created file
    let jsonContent = JSON.parse(fileContent); //Convert it into an object using JSON
    jsonContent.Name = charName; //Change the Name variable
    let newJSONString = JSON.stringify(jsonContent); //Convert it back into a string
    fs.writeFile(newFile, newJSONString, function (err) { //Write the string back onto the file
        if (err) throw err;
        console.log('Character Saved!');
    });

}

function getCharacter(userID) { //Gets the character file for the specified user ID
    let filePath = __dirname + "/characters/" + userID + ".json";
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
    } else {
        return false //If the file doesnt exist return false
    }
}


async function newUser(email, password, charname, callback) {  //Creates a new user using the OKTA authentication server
    let options = { //This section defines all the options handed to the request function
        url: oktaURL + '/api/v1/users',
        json: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "SSWS " + authToken
        },
        //The relevant information to create the user
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
    console.log("CREATING USER --");
    console.log("USERNAME: " + email);
    console.log("PASSWORD: " + password);
        await request.post(options, (err, res, body) => { //Make a post request to the OKTA
            if (err || body.errorCode) {
                if (body.errorCode) {
                    console.log(body);
                    err = body.errorCauses[0].errorSummary.toString();
                    console.log(err)
                } else {
                    console.log("USER FAILED TO CREATE, ERROR: " + err);
                }
                callback(false, err)
            } else {
                console.log("USER CREATED");
                initCharacter(charname, body.id);
                callback(true)
            }


        })
    }


async function createSession(sessiontoken, callback) {
    let options = {
        url: oktaURL + "/api/v1/sessions",
        json: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: {
            "sessionToken": sessiontoken
        }
    };
    request.post(options, (err, res, body) => { //Activates a session using the session token
        if (err || body.errorCode) {
            if (body.errorCode) {
                console.log(body);
                err = body.errorSummary.toString();
                console.log(err)
            } else {
                console.log("SESSION CREATION FAILED FAILED, ERROR: " + err);
            }
            callback(false, err)
        } else {
            console.log(body);
            console.log("SESSION CREATION SUCCESSFUL, SESSION ID: " + body.id.toString());
            callback(true, body.id)
        }

    })
}

async function loginUser(username, password, callback) { //Logs a user in using OKTA authentication
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
    await request.post(options, (err, res, body) => { //Makes post request to Okta authentication server
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
            createSession(body.sessionToken, callback)
        }
    });
}

async function getCharInfoFromSessionID(sessionID, callback) {
    let options = {
        url: oktaURL + "/api/v1/sessions/" + sessionID.toString(),
        json: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "SSWS " + authToken
        },
    };
    request.get(options, (err, res, body) => { //Makes post request to Okta authentication server
        if (err || body.errorCode) {
            if (body.errorCode) {
                console.log(body);
                err = body.errorSummary.toString();
                console.log(err)
            } else {
                console.log("NO SESSION FOUND, ERROR: " + err);
            }
            callback(false, err)
        } else {
            console.log(body);
            let userID = body.userId; //Get the charname from the transaction state response (stored in variable displayname

            let charinfo = getCharacter(userID);
            if (charinfo) {
                console.log("CHARACTER INFO FOUND, RETURNING: " + charinfo);
                callback(true, charinfo)
            } else {
                console.log("Character does not exist, activate crying mode")
                callback(false, "CHARACTER DOES NOT EXIST")
            }
        }
    });
}

app.get('/userpage', function (req, resp) {
    resp.redirect("/userpage.html")
});

app.get("/char/:sessionID", function (req, resp) {
    console.log("CHAR GET DETECTED");
    let sessionID = req.params.sessionID;
    getCharInfoFromSessionID(sessionID, function (status, data) {
        if (status) {
            console.log("SENDING CHARACTER DATA: "+data.toString());
            resp.send(data.toString())
        } else {
            resp.status(400).send(data)
        }
    })

});

app.post("/login", upload.none(), function (req, resp) {
    console.log("LOGIN ATTEMPT DETECTED");
    let email = req.body.email;
    let password = req.body.password;
    loginUser(email, password, function callback(status, sessionID) { //This callback function is called by the loginUser function when it resolves
        if (status) {
            console.log("SENDING TOKEN: " + sessionID.toString());
            resp.send(sessionID)
        } else {
            console.log("SENDING LOGIN ERROR");
            resp.status(401).send()
        }
    })
});


app.post("/signup", upload.none(), function (req, resp) {
    let email = req.body.email;
    let password = req.body.password;
    let charname = req.body.charname;
    newUser(email, password, charname, function (status, err = null) {
        if (status === false) {
            resp.status(422);
            console.log("SENDING ERROR: " + err);
            resp.send(err)
        } else {
            resp.status(201);
            resp.send("Creation Successful")
        }

    })
});

app.listen(port);
console.log("SERVER RUNNING");