const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) return res.json({'message': "Email and password is required!"})

    const user = await User.findOne({email: email}).exec()

    if (!user) return res.sendStatus(httpStatus.UNAUTHORIZED)
    
    const matchPassword = await bcrypt.compare(password, user.password)
    
    if(matchPassword){
        const accessToken = jwt.sign(
            {
                userId: user._id
            },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({accessToken: accessToken})
    }else{
        res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}

module.exports = { login }