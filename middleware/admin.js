



module.exports = function(req , res , next ) {
if (!req.user.isadmin) {
    return res.status(403).send('you are not admin...')    
}
next();

    
}
