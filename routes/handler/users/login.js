const md5 = require('md5')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()
const { PASSWORD_SALT } = process.env

module.exports = async (req, res) => {
    const schema = {
        username: 'string|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({
        where: { username: req.body.username }
    })

    if (!user) {
        return res.status(409).json({
            status: 'error',
            message: 'Account not found'
        })
    }

    const password = md5(`${PASSWORD_SALT}.${req.body.password}.${PASSWORD_SALT}`)
    const isValidPassword = password === user.password
    if (!isValidPassword) {
        return res.status(409).json({
            status: 'error',
            message: 'Password is not correct'
        })
    }

    return res.json({
        status: 'success',
        data: {
            uuid: user.uuid,
            username: user.username,
            name: user.name,
            email: user.email,
            bio: user.bio,
            role: user.role,
            avatar: user.avatar
        }
    })

}