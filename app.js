const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongodb = require('mongodb');


const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
console.log(port)

const ObjectId = mongodb.ObjectId;

const db = require('./database/database');

app.use(express.static('public'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')

//signup Route
const signUpRoute = require('./Routes/signUp');
app.use('/', signUpRoute);

//login Route
const loginRoute = require('./Routes/login');
app.use('/', loginRoute);


app.use('/',function (req, res) {

    res.render('404');
});

db.connectTo().then(() => {
    app.listen(port, () => {
        console.log('server running on port '+port)
    });
}).catch((err) => console.log(err.message));