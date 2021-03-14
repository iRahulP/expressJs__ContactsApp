const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

// // middleware 1
// app.use(function (req, res, next) {
//     req.myName = "IRON";
//     console.log("Middleware 1");
//     next();
// });

// //middleware 2
// app.use(function (req, res, next) {
//     console.log("My Name is ", req.myName);
//     console.log("middleware 2");
//     next();
// });

var contactList = [
    {
        name: 'Rahul',
        phone: '88888888'
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: 'Jojo',
        phone: '00000000'
    }
]

app.get('/', function (req, res) {
    // console.log(__dirname);
    // res.send('<h1>It\'s Running</h1>');
    
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in  fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "Contacts",
            contact_list: contacts
        });
    });
});

app.get('/practise', function (req, res) {
    console.log(req.myName);
    return res.render('practise', {
        title: "play ejs"
    });
});

app.post('/create-contact', function (req, res) {
    //console.log(req.myName);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //    contactList.push(req.body);
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    //storing to mongo db
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("Error in creating a contact!");
            return;
        }
        console.log("********", newContact);
        return res.redirect('back');
    })

    //    return res.redirect('/');
    // return res.redirect('back');
})


app.listen(port, function (err) {
    if (err) {
        console.log("Error in running Server", err);
    }
    console.log("Express running on : ", port);
});

app.get('/delete-contact/:id', function (req, res) {
    //console.log(req.params);
    //let phone = req.params.phone;
    //get is from url
    let id = req.params.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // console.log(contactIndex);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    //find the contact in the db using id and delete
    Contact.findByIdAndDelete(id, function (err){
        if(err){
            console.log("Error deleting Contact");
            return;
        }
        return res.redirect('/');
    })
});

