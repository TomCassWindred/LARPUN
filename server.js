const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;

let exp = express();
exp.use(express.static('client'));


exp.get('/random/:max', function(req, resp){
    max = parseInt(req.params.max);
    rand = Math.floor(Math.random()*max) +1;
    console.log('Max via url is ' + max + ' rand is ' + rand);
    resp.send('' + rand)
});

exp.get('/r', function(req, resp){
    max = parseInt(req.query.max);
    rand = Math.floor(Math.random()*max) +1;
    console.log('Max via query is ' + max + ' rand is ' + rand);
    resp.send('' + rand)
});

exp.listen(port);
console.log("SERVER RUNNING");