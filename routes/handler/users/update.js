const md5 = require('md5')
const Hashids = require('hashids')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()
const { PASSWORD_SALT, ID_SALT } = process.env
const hashids = new Hashids(ID_SALT)

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        bio: 'string|optional',
        avatar: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const id = req.params.id
    const user = await User.findOne({
        where: { username: id }
    })
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    const email = req.body.email
    if (email) {
        const checkEmail = await User.findOne({
            where: { email }
        })

        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already exist'
            })
        }

    }

    const password = md5(`${PASSWORD_SALT}.${req.body.password}.${PASSWORD_SALT}`)
    const {
        name, bio, avatar
    } = req.body

    await user.update({
        email, password, name, bio, avatar
    })

    return res.json({
        status: 'success',
        data: {
            id: hashids.encode(user.id),
            name,
            email,
            bio,
            avatar
        }
    })

}