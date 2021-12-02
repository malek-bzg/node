const jwt = require ("jsonwebtoken");


module.exports = function(req , res , next ) {
const token = req.header('x-auth-token')
if (!token) {
    return res.status(404).send('access rejected...')    
}
try {
    const decodtoken = jwt.verify(token, 'privet key') 
    req.user = decodtoken;
    next()
} catch (e) {

    res.status(400).send('wrong token...')
    
}

    
}
