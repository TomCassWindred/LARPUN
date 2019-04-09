const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;


var bodyParser = require('body-parser');
let app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));

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
    let username =  req.body.charname;
    console.log("Form received, returning "+ req.body.charname);
    resp.redirect('userpage.html');

});

app.listen(port);
console.log("SERVER RUNNING");