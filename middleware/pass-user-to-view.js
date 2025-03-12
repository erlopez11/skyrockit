
//check to see if the user is there, it they are the set to res.local
//if user is not there set to null
//next calls the next function in route handling sequence

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    //anything we need to access in our templates globally
    //can be added as a property to res.locals
    //res is short for response
    //generating templates is part of the response
    next()
};


/*

if (req.session.user) {
res.local.user = req.session.user;
} else {
    res.locals.user = null
 }
    
 */

module.exports = passUserToView;