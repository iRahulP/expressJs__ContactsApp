const path = require('path');
const express = require('express');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    // console.log(__dirname);
    // res.send('<h1>It\'s Running</h1>');
    return res.render('home', { title: "Welcome" });
});



app.listen(port, function (err) {
    if (err) {
        console.log("Error in running Server", err);
    }
    console.log("Express running on : ", port);
});