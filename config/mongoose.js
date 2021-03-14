//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db', { useNewUrlParser: true, useUnifiedTopology: true });

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//up and running
db.once('open', function () {
    console.log("Connected to Mongo Instance");
    // we're connected!
});