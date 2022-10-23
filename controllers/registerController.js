const User = require('../model/User')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const {fullName, email, password} = req.body
    if(!email || !password) return res.json({'message': "Email and password is required!"})

    const duplicate = await User.findOne({email: email}).exec()
    if(duplicate) return res.sendStatus(409)

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await User.create({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        res.json(result)
    } catch (error) {
        res.json({'message': error})
    }
}

module.exports = {register};