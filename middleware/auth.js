// This function sits in front of your main routes
module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/signin'); // No session? Back to the door.
    }
    next(); // Valid session? Come on in.
};