const express = require('express');
const port = 8000;

const app = express();


app.get('/', function (req, res){
    console.log(req);
    res.send('<h1>It\'s Running</h1>');
});



app.listen(port, function(err){
    if(err){
        console.log("Error in running Server", err);
    }
    console.log("Express running on : ",port);
});