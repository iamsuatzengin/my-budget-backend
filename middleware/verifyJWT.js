const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(
        token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if(error) return res.sendStatus(403) // invalid
            req.user = user
            console.log(req.user); // { userId: '63552390564187b61964d308', iat: 1666524064 }
            next()
        }
    )
}

module.exports = verifyJWT