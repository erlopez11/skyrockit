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




module.exports = router;