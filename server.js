const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const applicationsController = require('./controllers/applications.js');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Middleware

//decodes form submission and makes it available
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Custom Middleware (depends on session middleware to run)
//passUserToView comes after session middleware but before homepage
app.use(passUserToView);

//Routes

app.get('/', (req, res) => {
  if (req.session.user) {
    //redirect signed in users to app index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    //show homepage for users not signed in
    res.render('index.ejs');
  }
});

app.use('/auth', authController);

//user has to sign in first before we can check if they are signed in
app.use(isSignedIn);

app.use('/users/:userID/applications', applicationsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
