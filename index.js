const path = require('path');
const express = require('express');
const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

// middleware 1
app.use(function (req, res, next) {
    console.log("Middleware 1");
    next();
});

//middleware 2
app.use(function (req, res, next) {
    console.log("middleware 2");
    next();
});

var contactList = [
    {
        name: 'Rahul',
        phone: '88888888'
    },
    {
        name: 'Tony',
        phone: '00000000'
    }
];

app.get('/', function (req, res) {
    // console.log(__dirname);
    // res.send('<h1>It\'s Running</h1>');
    return res.render('home', {
        title: "Contacts",
        contact_list: contactList
    });
});

app.get('/practise', function (req, res) {
    return res.render('practise', {
        title: "play ejs"
    });
});

app.post('/create-contact', function (req, res) {
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });

    //    contactList.push(req.body);
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone);

    return res.redirect('/');
    // return res.redirect('back');

})


app.listen(port, function (err) {
    if (err) {
        console.log("Error in running Server", err);
    }
    console.log("Express running on : ", port);
});