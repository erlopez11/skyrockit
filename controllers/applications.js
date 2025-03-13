const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//GET /users/:userID/applications
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
        //pass current users application to index page
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Get /users/:userID/applications/new
router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});

//POST /users/:userID/applications
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body); 
        //changes application list in memory ONLY- NOT saved in the database
        await currentUser.save() //makes changed permanent in database
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

//GET /users/:userID/applications/:applicationID
router.get('/:applicationId', async (req, res) => {
    try {
        //Look up the user that is currently logged in
        const currentUser = await User.findById(req.session.user._id);
        //find the subdocument in the currently logged in user's applications list
        const application = currentUser.applications.id(req.params.applicationId);
        //render show template with the subdocument details
        res.render('applications/show.ejs', {
            application 
            //property shorthand syntax whenever the prop name
            //and variable name holding the value are the same
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});




module.exports = router;