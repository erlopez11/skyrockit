const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    //if user is signed in call the next middleware function
    //redirect user to the sign in
    res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;