const md5 = require('md5')
const Hashids = require('hashids')
const { v4: uuidv4 } = require('uuid')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()
const { PASSWORD_SALT, ID_SALT } = process.env
const hashids = new Hashids(ID_SALT)

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        username: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (user) {
        return res.status(409).json({
            status: 'error',
            message: 'This email is already exist'
        })
    }

    user = await User.findOne({
        where: { username: req.body.username }
    })

    if (user) {
        return res.status(409).json({
            status: 'error',
            message: 'This username is already exist'
        })
    }

    const password = md5(`${PASSWORD_SALT}.${req.body.password}.${PASSWORD_SALT}`)

    const data = {
        password,
        uuid: uuidv4(),
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        role: 'member'
    }

    const createUser = await User.create(data)
    return res.json({
        status: 'success',
        data: {
            id: hashids.encode(createUser.id)
        }
    })

}